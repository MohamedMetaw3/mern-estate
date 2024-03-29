import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const  currentUser  = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 w-100 h-24 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold p-3 text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">REAL</span>
            <span>Estate</span>
          </h1>
        </Link>
        <form className="flex items-center rounded-lg bg-slate-100 p-3 ">
          <input
            type="text"
            placeholder="Search..."
            className=" text-center bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
         
                   <li className="hidden sm:inline text-slate-700 hover:underline">
            {currentUser?.name}
          </li>
          <Link to="/profile">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Profile
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>

          
        </ul>
      </div>
    </header>
  );
};

export default Header;
