import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { ApplicationsListComponent } from './applications-module';
import { FilterComponent } from './filters-module';

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <div>
        <h1>Hello Cleanup POC</h1>
        <QueryClientProvider client={queryClient}>
          <FilterComponent />
          <ApplicationsListComponent />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
