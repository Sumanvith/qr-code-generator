import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
