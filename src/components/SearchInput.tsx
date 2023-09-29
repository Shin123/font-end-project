import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { CloseIcon, SearchIcon } from './icons';
import { useSlice } from './stores/stores';

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    padding: 12px 16px 12px 16px;

    &:hover fieldset {
      border-color: #d1b8fa;
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

type Props = {
  searchStatus: string;
};

const SearchInput = ({ searchStatus }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('');
  const { setSearchQuery, searchQuery } = useSlice((state) => state);

  const handleFocus = () => {
    // Focus the input when the user clicks the SearchIcon
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRemoveValue = () => {
    inputRef.current?.focus();
    setValue('');
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      setSearchQuery(value);
    }
  };

  const handleCancelSearch = () => {
    setValue('');
    setSearchQuery('');
  };

  return (
    <>
      <StyledTextField
        variant='outlined'
        value={value}
        onChange={handleChange}
        placeholder='Search'
        ref={inputRef}
        onKeyDown={handleKeyPress}
        sx={{
          '.MuiInputBase-root': {
            backgroundColor: value ? '#FFFFFF' : '#F8F8F9',
            borderRadius: '54px',
            fontFamily: 'Pretendard',
            height: '42px',
          },
          '.MuiOutlinedInput-root': {
            fieldset: {
              borderColor: value ? '#353C49' : '#d9e0e8',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon
                className='w-5 h-5 cursor-pointer'
                onClick={handleFocus}
              />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position='end'>
              <IconButton
                sx={{
                  transition: 'opacity 0.5s ease',
                  padding: '4px',
                  '&.MuiIconButton-root': {
                    ':hover': {
                      backgroundColor: '#F8F8F9',
                    },
                  },
                }}
                className='hover:bg-neutral-7 active:bg-neutral-6'
              >
                <CloseIcon
                  className='w-[10px] h-[10px]'
                  onClick={handleRemoveValue}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {searchQuery && searchStatus === 'success' && (
        <Button
          disableRipple
          sx={{
            padding: '12px 16px',
            borderRadius: '8px',
            textColor: '#353C49',
            '&:hover': {
              backgroundColor: '#F8F8F9',
            },
            '&:active': {
              backgroundColor: '#F2F4F6',
            },
          }}
          onClick={handleCancelSearch}
        >
          <Typography
            sx={{
              fontFamily: 'Pretendard',
              textTransform: 'capitalize',
              fontSize: '14px',
              lineHeight: '18px',
            }}
            color={'#353C49'}
          >
            Cancel
          </Typography>
        </Button>
      )}
    </>
  );
};

export default SearchInput;
