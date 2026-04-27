import MagneticWrapper from "./components/magneticWrapper.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MagneticWrapper>
        <button className="magnetic-btn">Hover me</button>
      </MagneticWrapper>
      <MagneticWrapper>
        <button className="magnetic-btn magnetic-btn--outline">Get in touch</button>
      </MagneticWrapper>
      <MagneticWrapper>
        <div className="magnetic-dot" />
      </MagneticWrapper>
    </div>
  );
}

export default App;
