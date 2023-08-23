import './App.css';
import BeautifulDndComponent from './applications-module/components/beatiful-dnd/BeautifulDndComponent';
import DndKitComponent from './applications-module/components/dnd-kit/DndKitComponent';
import ReactAriaComponent from './applications-module/components/react-aria/ReactAriaComponent';

function App() {

  return (
    <div>
      {/* <div>
        <h1>Hello Cleanup POC</h1>
        <FilterComponent />
        <ApplicationsListComponent filterConditions={filterConditions} />
      </div> */}

      <BeautifulDndComponent />
      {/* <DndKitComponent /> */}
      <ReactAriaComponent />
    </div>
  );
}

export default App;
