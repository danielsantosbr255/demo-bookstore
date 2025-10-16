import HomeBanner from "../components/home/HomeBanner";
import CategoriesCard from "../components/home/CategoriesCard";
import { GiUfo, GiLovers, GiCastle, GiCavalry, GiBrokenHeartZone, GiCowled } from "react-icons/gi";

const Home = () => {
  return (
    <main className="flex flex-col w-full h-full bg-gradient-to-b from-highlight via-sky-100 to-white items-center text-3xl">
      <HomeBanner />

      <section className="flex flex-col w-full items-center justify-center pt-5 gap-5">
        <h2 className="text-2xl font-bold text-primary">Categorias em destaque</h2>

        <div className="flex w-full gap-4 justify-center items-center">
          <CategoriesCard label="Fantasia" icon={<GiCastle size={30} />} />
          <CategoriesCard label="Ficcão" icon={<GiUfo size={30} />} />
          <CategoriesCard label="Romance" icon={<GiLovers size={30} />} />
          <CategoriesCard label="Aventura" icon={<GiCavalry size={30} />} />
          <CategoriesCard label="Drama" icon={<GiBrokenHeartZone size={30} />} />
          <CategoriesCard label="Suspense" icon={<GiCowled size={30} />} />
        </div>
      </section>
    </main>
  );
};

export default Home;
