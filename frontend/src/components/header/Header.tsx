import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="links bg-white/90 backdrop-blur-xl fixed rounded-2xl px-8 py-3 z-50 border-b-3 border-highlight/90 shadow-md shadow-highlight/40 flex w-full max-w-11/12 left-1/2 -translate-x-1/2 top-4">
      <Navbar />
    </div>
  );
};

export default Header;
