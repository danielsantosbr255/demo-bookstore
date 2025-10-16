import Button from "../ui/Button";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GiSpellBook } from "react-icons/gi";

const HomeBanner = () => {
  return (
    <section className="border-rotating pb-1 w-full h-180 rounded-b-2xl shadow-lg shadow-secondary/40">
      <div className="bg-home-pattern bg-center bg-no-repeat bg-cover flex flex-col w-full h-full items-center justify-center rounded-b-2xl">
        <h1 className="flex flex-col font-bold text-white items-center">
          <GiSpellBook size={120} />
          Bem-vindo ao Bookstore
        </h1>

        <Button variant="primary" className="mt-4 text-xl min-w-xs" align="center">
          Esplore novos títulos
          <HiOutlineBookOpen />
        </Button>
      </div>
    </section>
  );
};

export default HomeBanner;
