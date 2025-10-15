import { ImBooks } from "react-icons/im";

const Home = () => {
  return (
    <div className="flex w-full h-full bg-gradient-to-b from-red-100 to-white items-center justify-center text-3xl">
      <h1 className="flex flex-col font-bold text-primary items-center">
        <ImBooks size={120} />
        Bem-vindo ao Bookstore
      </h1>
    </div>
  );
};

export default Home;
