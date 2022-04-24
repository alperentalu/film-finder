import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import TopBar from "./page/Topbar"
function App() {
  return (
    <Routes>
      <Route path="/" element={<TopBar/>}>
      <Route index element={<Home />} />
      <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
export default App;
