import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'services/react-query';
import { ThemeProvider } from 'providers/ThemeProvider';
import { AuthProvider } from 'providers/auth';
import { UserProvider } from 'providers/UserProvider';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
              <Routes />
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
