import Button from "../ui/Button";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GiSpellBook } from "react-icons/gi";

const HomeBanner = () => {
  return (
    <section className="border-spin w-full h-150 lg:h-180 shadow-lg shadow-secondary/40">
      <div className="bg-home-pattern bg-center bg-no-repeat bg-cover flex flex-col w-full h-full items-center justify-center rounded-b-2xl">
        <div className="motion-preset-slide-up space-y-6">
          <h1 className="flex flex-col font-bold text-white text-shadow-2xs items-center">
            <GiSpellBook size={120} />
            Bem-vindo ao Bookstore
          </h1>

          <Button
            variant="primary"
            className="mt-4 text-xl min-w-xs motion-preset-seesaw-sm motion-preset-stretch-sm"
            align="center"
          >
            Esplore novos títulos
            <HiOutlineBookOpen />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
