import Cards from "@/components/Cards/Cards";
import Title from "./Title";
import { useDataDisplay } from "@/stores/DataDisplayStore";
import Lists from "@/components/Lists/Lists";
import { useCurrentPath, usePageTransitioning } from "@/stores/PathStore";
import { motion } from "framer-motion";
import { useIsLoading } from "@/stores/LoadingStore";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  const dataDisplay = useDataDisplay();
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();
  const currentPath = useCurrentPath();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={
        isLoading || currentPath !== "/"
          ? { opacity: 0 }
          : pageTransitioning
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      className="w-full h-auto px-[24px] md:px-[48px] lg:px-[64px]"
    >
      <Title />
      {dataDisplay === "grid" ? <Cards /> : <Lists />}
      <Footer />
    </motion.section>
  );
};

export default Home;
