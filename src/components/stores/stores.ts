import { create } from 'zustand';
import { GetProductsApiResponse } from '../../types';

// define types for state values and actions separately
type State = {
  dataStore: GetProductsApiResponse;
  categories: string[];
  searchQuery: string;
};

type Actions = {
  setCategories: (categories: string[]) => void;
  setDataStore: (data: GetProductsApiResponse) => void;
  setSearchQuery: (searchQuery: string) => void;
  reset: () => void;
};

// define the initial state
export const initialState: State = {
  dataStore: {
    products: [],
    total: 0,
    limit: 0,
    skip: 0,
  },
  categories: [],
  searchQuery: '',
};

// create store
export const useSlice = create<State & Actions>()((set) => ({
  ...initialState,

  setCategories: (categories: string[]) => {
    set({ categories: categories });
  },

  setDataStore: (dataStore: GetProductsApiResponse) => {
    set({ dataStore: dataStore });
  },

  setSearchQuery: (searchQuery: string) => {
    set({ searchQuery: searchQuery });
  },

  reset: () => {
    set(initialState);
  },
}));
