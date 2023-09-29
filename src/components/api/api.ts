import { useQuery } from 'react-query';

export function useGetProducts() {
  return useQuery(
    'getProducts',
    async () => {
      const res = await fetch(
        'https://dummyjson.com/products?limit=20&skip=0&select=title,price,thumbnail,stock,category'
      );
      if (!res.ok) {
        throw new Error('Error fetching data');
      }
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 600000, // Set cache time to 10 minutes (600,000 milliseconds)
    }
  );
}

export function useSearchProducts(searchQuery: string) {
  return useQuery(
    ['searchProducts', searchQuery],
    async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      if (!res.ok) {
        throw new Error('Error searching data');
      }
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 600000, // Set cache time to 10 minutes (600,000 milliseconds)
      enabled: searchQuery !== '',
    }
  );
}
