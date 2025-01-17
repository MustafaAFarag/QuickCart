import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import AccountSettings from './pages/AccountSettings';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import OrderDetails from './pages/OrderDetails';
import FinalOrder from './pages/FinalOrder';
import ProtectedRoute from './ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/order-details" element={<OrderDetails />} />
                <Route path="/final-order" element={<FinalOrder />} />
              </Route>
              <Route element={<AppLayout />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/product-detail" element={<ProductDetails />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/" element={<Homepage />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      <Toaster
        position="top-left"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 2000,
            style: {
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
            },
          },
          error: {
            duration: 3000,
            style: {
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
            },
          },
          style: {
            fontSize: '13px',
            maxWidth: '400px',
            padding: '12px 16px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
