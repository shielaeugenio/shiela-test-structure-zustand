import './App.css';
import { ApplicationsListComponent } from './applications-module';
import BeautifulDndComponent from './applications-module/components/beatiful-dnd/BeautifulDndComponent';
import DndKitComponent from './applications-module/components/dnd-kit/DndKitComponent';
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

      <BeautifulDndComponent />
      <DndKitComponent />
    </div>
  );
}

export default App;
