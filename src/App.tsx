import './App.css';
import { ApplicationsListComponent } from './applications-module';
import { FilterComponent } from './filters-module';

function App() {
  return (
    <div>
      Hello Zustand
      <FilterComponent />
      <ApplicationsListComponent />
    </div>
  );
}

export default App;
