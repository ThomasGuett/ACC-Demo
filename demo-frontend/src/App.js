import './App.css';
import Home from "./pages/Home";
import InputForm from "./pages/InputForm";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/form/:query?" element={<InputForm />} />
    </Routes>
    </Router>
  );
}

export default App;
