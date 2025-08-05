import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import PageTransition from '@/components/PageTransition';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Invoices from '@/pages/Invoices';
import Products from '@/pages/Products';
import Clients from '@/pages/Clients';
import Settings from '@/pages/Settings';
import InvoiceEditor from './pages/InvoiceEditor';
import NotFound from './pages/NotFound';

import { InvoicesProvider } from '@/context/InvoicesContext';
import { ClientsProvider } from '@/context/ClientsContext';
import { ProductsProvider } from '@/context/ProductsContext';
import { ModalProvider } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import PrivateRoute from './components/Auth/PrivateRoute';
import PrivateLayout from './components/Layout/PrivateLayout';

function AppRoutes() {
  const location = useLocation();
  return (
    // <PageWrapper>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition animation='fade'>
            <Navigate to="/login" replace />
          </PageTransition>
        } />

        <Route path="/login" element={
          <PageTransition animation='fade'>
            <Login />
          </PageTransition>
        } />

        <Route path="/register" element={
          <PageTransition animation='elastic'>
            <Register />
          </PageTransition>
        } />

        <Route element={
          <PrivateRoute>
            <NotificationProvider>
              <InvoicesProvider>
                <ClientsProvider>
                  <ProductsProvider>
                    <ModalProvider>
                      <PrivateLayout />
                    </ModalProvider>
                  </ProductsProvider>
                </ClientsProvider>
              </InvoicesProvider>
            </NotificationProvider>
          </PrivateRoute>
        }>
          <Route path="/dashboard" element={
            <PageTransition animation='elastic'>
              <Dashboard />
            </PageTransition>
          } />
          <Route path="/invoices" element={
            <PageTransition animation='elastic'>

              <Invoices />
            </PageTransition>
          } />
          <Route path="/products" element={
            <PageTransition animation='elastic'>
              <Products />
            </PageTransition>
          } />
          <Route path="/clients" element={
            <PageTransition animation='elastic'>
              <Clients />
            </PageTransition>
          } />
          <Route path="/settings" element={
            <PageTransition animation='elastic'>
              <Settings />
            </PageTransition>
          } />

          <Route path="/invoiceEditor" element={
            <PageTransition animation='elastic'>
              <InvoiceEditor />
            </PageTransition>
          } />

          <Route path="/notfound" element={<NotFound />} />
          <Route path="/notfound/quote" element={<NotFound />} />
          <Route path="/notfound/payment" element={<NotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
    // </PageWrapper>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
