import './App.css';
import { ApplicationsListComponent } from './applications-module';
import BeautifulDndComponent from './applications-module/components/BeautifulDndComponent';
import { FilterComponent, useGetFilterConditions } from './filters-module';

function App() {
  const { filterConditions } = useGetFilterConditions();

  return (
    <div>
      {/* <div>
        <h1>Hello Cleanup POC</h1>
        <FilterComponent />
        <ApplicationsListComponent filterConditions={filterConditions} />
      </div> */}

      <BeautifulDndComponent filterConditions={filterConditions} />
    </div>
  );
}

export default App;
