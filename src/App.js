import './App.css';
import Card from './components/Card';
import Container from './components/Container';

function App() {
  return (
    <div className="App flex-col space-y-5">
      <Card />
      <Container />
      <Container />
    </div>
  );
}

export default App;
