import "./styles.css";
import List from "./List";

export default function App() {
  return (
    <div className="App">
      <h1>List:</h1>
      <List itemsCount={200} />
    </div>
  );
}
