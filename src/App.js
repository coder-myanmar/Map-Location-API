import Sidebar from "./Pages/Sidebar";
import Map from "./Pages/Map";
import { useState } from "react";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  console.log(selectPosition);
  return (
    <div className="App">
      <Sidebar
        selectPosition={selectPosition}
        setSelectPosition={setSelectPosition}
      />
      <Map selectPosition={selectPosition} />
    </div>
  );
}

export default App;
