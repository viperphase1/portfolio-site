import './App.scss';
import Menu from "./components/Menu/Menu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.alt";

function App() {
  return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
