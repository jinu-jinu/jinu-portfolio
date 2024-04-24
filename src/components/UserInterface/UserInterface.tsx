import Nav from "./Nav";
import Header from "./Header";
import "./ui.scss";

const UserInterface = () => {
  return (
    <div className="position fixed top-0 left-0 z-30 bg-transparent">
      <Header />
      <Nav />
    </div>
  );
};

export default UserInterface;
