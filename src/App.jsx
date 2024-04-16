import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import ImportFile from "./components/ImportFile";
import FetchData from "./components/FetchData";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<ImportFile/>} />
        <Route path="/show" element={<FetchData/>} />
      </Routes>
    </Router>
  );
}

export default App;
