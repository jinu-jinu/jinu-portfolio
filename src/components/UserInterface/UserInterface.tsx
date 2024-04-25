import Nav from "./Nav";
import Header from "./Header";
import "./ui.scss";
import { useIsLoading } from "@/stores/LoadingStore";
import { usePageTransitioning } from "@/stores/PathStore";
import { motion } from "framer-motion";

const UserInterface = () => {
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLoading || pageTransitioning ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      className="position fixed top-0 left-0 z-30 bg-transparent"
    >
      <Header />
      <Nav />
    </motion.div>
  );
};

export default UserInterface;
