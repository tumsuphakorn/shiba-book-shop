import PetsIcon from "@material-ui/icons/Pets";

import "./App.css";
import POS from "./components/POS";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <PetsIcon fontSize="large" />
        <h1>Shiba Book Shop POS</h1>
        <PetsIcon fontSize="large" />
      </div>
      <POS />
    </div>
  );
}

export default App;
