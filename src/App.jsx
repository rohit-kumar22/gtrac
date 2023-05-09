import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter
        basename={import.meta.env.DEV ? "/" : "/react-vite-gh-pages/"}>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
