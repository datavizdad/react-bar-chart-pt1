import BarChart from "./charts/BarChart";
import data from "./data/data";
function App() {
  return (
    <div className="app">
      <div className="chart-card">
        <h1 className="chart-title">Hello World</h1>
        <BarChart data={data} />
      </div>
    </div>
  );
}

export default App;
