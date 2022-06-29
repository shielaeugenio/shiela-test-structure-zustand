import './App.css';
import { ApplicationsListComponentRq } from './applications-module';
import { FilterComponentReactQuery } from './filters-module';
import { 
  QueryClient as ReactQueryClient, 
  QueryClientProvider as ReactQueryClientProvider 
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const reactQueryClient = new ReactQueryClient()

function App() {
  return (
    <ReactQueryClientProvider client={reactQueryClient}>
      <div>
        <div>
          <h1>Hello React-Query</h1>
          <FilterComponentReactQuery />
          <ApplicationsListComponentRq />
        </div>
      </div>
      <ReactQueryDevtools />
    </ReactQueryClientProvider>
  );
}

export default App;
