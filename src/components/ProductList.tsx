import { Button, Collapse, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { GetProductsApiResponse, Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronRight } from './icons';
import { initialState, useSlice } from './stores/stores';

const StyledDivider = styled(Divider)(() => ({
  '&::before': {
    width: '0%',
    paddingLeft: '0px',
  },
  '&::after': {
    border: '1px dashed #D9E0E8',
  },

  '.MuiDivider-wrapper': {
    paddingLeft: '0px',
    paddingRight: '16px',
  },
}));

type Props = {
  status: string;
  searchStatus: string;
  dataStore: GetProductsApiResponse;
  searchData: GetProductsApiResponse;
};

const ProductList = ({
  status,
  searchStatus,
  dataStore,
  searchData,
}: Props) => {
  const { setDataStore, searchQuery } = useSlice((state) => state);
  const isSearched = searchStatus === 'success';

  const queryClient = useQueryClient();
  const [openProductList, setOpenProductList] = React.useState<number[]>(
    Array(dataStore?.total).fill(0)
  );

  const handleUpdateData = (id: number, title: string) => {
    queryClient.setQueryData<GetProductsApiResponse | undefined>(
      searchQuery ? ['searchProducts', searchQuery] : 'getProducts',
      (
        prevData: GetProductsApiResponse | undefined
      ): GetProductsApiResponse => {
        const data = isSearched ? prevData! : dataStore;
        console.log(data, 'data');
        if (!prevData) return initialState.dataStore;
        const updatedProducts = prevData?.products?.map((item) => {
          if (item.id === id) {
            return { ...item, title: title };
          }
          return item;
        });
        // Return a new object with the updated products
        return {
          ...data,
          products: updatedProducts || [], // Ensure products is an array
        };
      }
    );
  };

  const handleUpdateName = (id: number, title: string) => {
    handleUpdateData(id, title);
    if (isSearched) {
      const updatedProducts = dataStore?.products?.map((item) => {
        if (item.id === id) {
          // Update the title for the matching item
          return { ...item, title: title };
        }
        return item;
      });

      setDataStore({
        ...dataStore,
        products: updatedProducts || [],
      });
    }
  };

  const handleOpenGroup = (index: number) => {
    const newOpenProductList = [...openProductList];
    if (newOpenProductList[index] === 0) {
      newOpenProductList[index] = 1;
    } else {
      newOpenProductList[index] = 0;
    }
    setOpenProductList(newOpenProductList);
  };

  const groupedData = (isSearched ? searchData : dataStore)?.products.reduce(
    (acc: { [key: string]: Product[] }, item: Product) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (searchQuery) {
      setOpenProductList(Array(dataStore?.total).fill(1));
    }
  }, [searchQuery]);

  return (
    <Stack spacing={'24px'} className='overflow-y-auto'>
      <StyledDivider textAlign='left'>
        <Typography
          className='text-text-0 leading-headline-2'
          sx={{ fontFamily: 'Pretendard' }}
        >
          Product List
        </Typography>
      </StyledDivider>
      <Stack className='overflow-y-auto'>
        {searchStatus === 'loading' && <div>Searching...</div>}
        {status === 'loading' && <div>Loading...</div>}
        {status === 'error' && <div>Error</div>}
        {status === 'success' &&
          Object.keys(groupedData)?.map((category, index) => (
            <Stack key={index}>
              <Button
                disableRipple
                onClick={() => handleOpenGroup(index)}
                sx={{
                  width: '100%',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  borderRadius: '8px',
                  fontFamily: 'Pretendard',
                  textColor: '#353C49',
                  '&:hover': {
                    backgroundColor: '#F8F8F9',
                  },
                  '&:active': {
                    backgroundColor: '#F2F4F6',
                  },
                }}
              >
                <ChevronRight
                  className={`${
                    openProductList[index] === 1 &&
                    'rotate-90 transition-transform	duration-300 ease-in-out'
                  } ${
                    openProductList[index] === 0 &&
                    'rotate-0 transition-transform duration-300 ease-in-out'
                  }`}
                />
                <Typography
                  sx={{
                    fontFamily: 'Pretendard',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                    lineHeight: '22px',
                  }}
                  color={'#353C49'}
                >
                  {category}
                </Typography>
              </Button>
              <Collapse in={openProductList[index] === 1}>
                <Stack sx={{ paddingLeft: '32px' }}>
                  {groupedData[category]?.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      name={product?.title}
                      price={product?.price}
                      thumbnail={product?.thumbnail}
                      id={product.id}
                      handleUpdateName={handleUpdateName}
                    ></ProductCard>
                  ))}
                </Stack>
              </Collapse>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ProductList;
