import HomeBanner from "../components/home/HomeBanner";
import CategoriesCard from "../components/home/CategoriesCard";
import { AdventureIcon, DramaIcon, FantasyIcon, FictionIcon, RomanceIcon, SuspenseIcon } from "../libs/utils/icons";

const Home = () => {
  return (
    <main className="flex flex-col w-full h-full bg-gradient-to-b from-highlight via-sky-100 to-white items-center text-3xl">
      <HomeBanner />

      <section className="flex flex-col w-full items-center justify-center pt-5 gap-5">
        <h2 className="text-2xl font-bold">Categorias em destaque</h2>

        <div className="flex w-full gap-2 lg:gap-4 px-2 justify-center items-center">
          <CategoriesCard label="Fantasia" icon={<FantasyIcon size={30} />} />
          <CategoriesCard label="Ficcão" icon={<FictionIcon size={30} />} />
          <CategoriesCard label="Romance" icon={<RomanceIcon size={30} />} />
          <CategoriesCard label="Aventura" icon={<AdventureIcon size={30} />} />
          <CategoriesCard className="hidden lg:flex" label="Drama" icon={<DramaIcon size={30} />} />
          <CategoriesCard className="hidden lg:flex" label="Suspense" icon={<SuspenseIcon size={30} />} />
        </div>
      </section>
    </main>
  );
};

export default Home;
