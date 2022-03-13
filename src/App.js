import './App.css';
import Card from './components/Card';
import Bars from './components/Bars';
import Lines from './components/Lines';

function App() {
  return (
    <div className="App flex-col space-y-5">
      <Card />
      <Bars />
      <Lines />
    </div>
  );
}

export default App;
