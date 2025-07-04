import RouteLayout from "./layouts/RouteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import { Route, Routes } from "react-router";
import TodoApp from "./pages/TodoApp";

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<RouteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todoapp" element={<TodoApp />} />
        </Route>
      </Routes>

    </>
  )}

export default App;
