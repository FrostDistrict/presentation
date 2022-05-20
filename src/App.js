import './App.css';
import Slideshow from "./Components/Slideshow/Slideshow";
import {slides} from "./Assets/Images";

function App() {
  return (
    <div className="App">
      <Slideshow slides={slides} timeout={6000}/>
    </div>
  );
}

export default App;
