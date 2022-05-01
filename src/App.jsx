import { Routes, Route } from "react-router-dom";
import { Board, Arena } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="arena" element={<Arena />} />
    </Routes>
  );
};

export default App;
