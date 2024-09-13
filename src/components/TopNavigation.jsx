import { FaSearch, FaHashtag, FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";
import { useLocation } from "react-router-dom";
import Tooltip from "./Ui/Tooltip";
const TopNavigation = () => {
  const location = useLocation();
  return (
    <div className="top-navigation">
      <HashtagIcon />
      <Title title={location.pathname} />
      <ThemeIcon />
      <Search />
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = ({ title }) => {
  const navigation = title.split("/");
  let header;
  if (!isNaN(Number(navigation[navigation.length - 1]))) {
    header = navigation[navigation.length - 3];
  } else {
    header = navigation.pop();
  }

  return <h5 className="title-text">{header}</h5>;
};

export default TopNavigation;
