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
          <Route index element={<TodoApp />} />
        </Route>
      </Routes>

    </>
  )}

export default App;
