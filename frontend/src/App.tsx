import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import Header from "./components/header/Header";
import { Activity } from "react";

function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bg-gradient-to-t from-sky-100 to-sky-50 h-dvh min-h-screen">
      <Activity mode={path === "/sign-in" ? "hidden" : "visible"}>
        <Header />
      </Activity>

      <main className="flex flex-1 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
