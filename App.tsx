import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppInner from './AppInner';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
