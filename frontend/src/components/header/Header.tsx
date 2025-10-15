import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="links bg-white fixed rounded-2xl shadow flex w-full px-6 py-4 z-50 max-w-11/12 left-1/2 -translate-x-1/2 top-4">
      <Navbar />
    </div>
  );
};

export default Header;
