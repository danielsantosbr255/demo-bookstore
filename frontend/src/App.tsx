import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";

function App() {
  return (
    <main className="bg-gray-500 h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </main>
  );
}

export default App;
