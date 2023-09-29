import {
  Button,
  Card,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { addCommas } from '../constant/helper';

type Props = {
  name: string;
  price: number;
  thumbnail: string;
  handleUpdateName: (id: number, name: string) => void;
  id: number;
};

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #6713ef;
      cursor: pointer;
    }
    &.Mui-focused fieldset {
      border: 1px solid #6713ef;
    }
  }

  .MuiOutlinedInput-root {
    &:hover {
      background-color: #ffffff;
    }
    &.Mui-focused {
      background-color: #ffffff;
    }
  }
`;

const ProductCard = ({
  name,
  price,
  thumbnail,
  id,
  handleUpdateName,
}: Props) => {
  const [isEditName, setIsEditName] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(name);

  const handleClickButtonProductName = () => {
    setIsEditName(true);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      handleUpdateName(id, nameValue);
      setIsEditName(false);
    }
  };

  return (
    <Card
      sx={{
        height: '96px',
        width: '440px',
        borderRadius: '8px',
        padding: '12px 16px',
        border: '1px solid #FFFFFF',
        ':hover': {
          border: '1px solid #D1B8FA',
        },
        boxShadow: 'unset',
        transition: 'transform 0.2s',
      }}
    >
      <Stack spacing={'24px'} direction={'row'} justifyContent={'flex-start'}>
        <CardMedia
          sx={{ height: '72px', width: '72px', borderRadius: '8px' }}
          component='img'
          image={thumbnail}
          alt='sda'
        />
        <Stack
          spacing={'8px'}
          justifyContent={'flex-start'}
          sx={{ width: '100%' }}
        >
          {isEditName ? (
            <StyledTextField
              variant='outlined'
              value={nameValue}
              onBlur={() => setIsEditName(false)}
              onChange={(e) => setNameValue(e.target.value)}
              autoFocus
              onKeyDown={handleKeyPress}
              sx={{
                input: {
                  padding: '6px 8px',
                },
                '.MuiInputBase-root': {
                  borderRadius: '8px',
                  fontFamily: 'Pretendard',
                  height: '32px',
                },
                '.MuiOutlinedInput-root': {
                  fieldset: {
                    borderColor: '#6713EF',
                  },
                  fontWeight: '600',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                },
              }}
            />
          ) : (
            <Button
              disableRipple
              fullWidth
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '6px 8px',
                textTransform: 'unset',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#F8F8F9',
                },
                '&:active': {
                  backgroundColor: '#F2F4F6',
                },
              }}
              onClick={handleClickButtonProductName}
            >
              <Typography
                sx={{
                  textAlign: 'left',
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                  fontSize: '16px',
                  textTransform: 'unset!important',
                  lineHeight: '20px',
                  color: '#353C49',
                  gap: '10px',
                }}
              >
                {name}
              </Typography>
            </Button>
          )}

          <Typography
            sx={{
              fontFamily: 'Pretendard',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '18px',
              color: '#676E7B',
              gap: '10px',
              paddingLeft: '6px',
            }}
          >
            <span className='pr-1'>$</span>
            {addCommas(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductCard;
