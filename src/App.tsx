import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductWidget from './components/ProductWidget';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductWidget />
    </QueryClientProvider>
  );
}

export default App;
