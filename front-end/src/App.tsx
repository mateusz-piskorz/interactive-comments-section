import { FC, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

const Home = lazy(() =>
  import("./pages/Home").then((module) => {
    return { default: module.Home };
  })
);

const Login = lazy(() =>
  import("./pages/Login").then((module) => {
    return { default: module.Login };
  })
);

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>This page does not exist</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const RouteWrapper = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
