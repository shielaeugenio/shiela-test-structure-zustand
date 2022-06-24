import './App.css';
import { ApplicationsListComponent, ApplicationsListComponentSwr } from './applications-module';
import { FilterComponent, FilterComponentSwr } from './filters-module';

function App() {
  return (
    <div>
      <div>
        <h1>Hello Zustand</h1>
        <FilterComponent />
        <ApplicationsListComponent />
      </div>
    </div>
  );
}

export default App;
