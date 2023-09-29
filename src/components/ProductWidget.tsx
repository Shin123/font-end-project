import { Stack } from '@mui/material';
import React from 'react';
import ProductList from './ProductList';
import SearchInput from './SearchInput';
// import { useGetProducts, useSearchProducts } from './api/api';
import { useGetProducts, useSearchProducts } from './api/api';
import { useSlice } from './stores/stores';

const ProductWidget = () => {
  const { setDataStore, dataStore, searchQuery } = useSlice((state) => state);
  const { data: fetchedData, status: statusFetchData } = useGetProducts();
  const { data: searchData, status: statusSearchData } =
    useSearchProducts(searchQuery);

  React.useEffect(() => {
    if (fetchedData) {
      setDataStore(fetchedData);
    }
  }, [fetchedData, setDataStore]);

  return (
    <div className='max-container flex justify-between items-center sm:flex-col gap-10'>
      <Stack
        className='default-box'
        height='100vh'
        width='528px'
        sx={{
          // backgroundColor: '#F8F8F9',
          borderRadius: '24px',
          boxShadow: '2px 6px 12px rgb(5,43,97, 0.12)',
          padding: '24px',
          gap: '32px',
        }}
      >
        <Stack direction={'row'} spacing={'32px'}>
          <SearchInput searchStatus={statusSearchData} />
        </Stack>
        <ProductList
          status={statusFetchData}
          searchStatus={statusSearchData}
          dataStore={dataStore}
          searchData={searchData}
        />
      </Stack>
    </div>
  );
};

export default ProductWidget;
