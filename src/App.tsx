import './App.css';
import { ApplicationsListComponent } from './applications-module';
import { FilterComponent, useGetFilterConditions } from './filters-module';

function App() {
  const { filterConditions } = useGetFilterConditions();

  return (
    <div>
      <div>
        <h1>Hello Cleanup POC</h1>
        <FilterComponent />
        <ApplicationsListComponent filterConditions={filterConditions} />
      </div>
    </div>
  );
}

export default App;
