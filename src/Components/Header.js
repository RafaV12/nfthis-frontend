import { useState } from 'react';
import MobileNav from './MobileNav';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const Header = () => {
  // Get the current location so we can change the header's text color based on it
  const { user, logout } = useGlobalContext();
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => {
    setShowMenu(false);
  };
  return (
    <header className="fixed top-0 p-2 h-12 md:h-auto w-full flex backdrop-filter backdrop-blur-2xl justify-between items-center z-30 bg-white bg-opacity-10 md:pb-5 lg:px-4 md:border md:bg-opacity-0 xl:left-1/2 xl:transform xl:-translate-x-1/2 2xl:container">
      <BiMenuAltLeft
        className="md:hidden text-3xl z-10 w-10 cursor-pointer"
        style={{ color: '#1F51FF' }}
        onClick={() => setShowMenu(!showMenu)}
      />
      {/* Mobile Menu */}
      {showMenu && <MobileNav closeMenu={closeMenu} />}
      {/* Menu Mask */}
      {showMenu && <div onClick={closeMenu} className="absolute left-0 top-0 h-screen w-full bg-black bg-opacity-40 z-40"></div>}

      {/* Desktop Nav */}
      <div className="pt-3 hidden md:flex container items-center justify-between">
        <div className="flex justify-around">
          <Link to="/" className="mr-4 font-semibold transition duration-200 ease-in-out focus:text-blue-600 hover:text-blue-600">
            Home
          </Link>

          <Link to="/search" className="mr-4 font-semibold transition duration-200 ease-in-out focus:text-blue-600 hover:text-blue-600">
            Search
          </Link>

          <Link to="/about" className="mr-4 font-semibold transition duration-200 ease-in-out focus:text-blue-600 hover:text-blue-600">
            About
          </Link>
        </div>
        {user ? (
          <div className="flex items-center">
            <Link to="/settings">
              <button className="mr-4 px-4 py-1.5 text-gray-700 border border-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-white hover:text-black">
                Settings
              </button>
            </Link>
            <button
              onClick={logout}
              className="mr-4 px-4 py-1.5 text-gray-700 border border-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-white hover:text-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="px-3 py-1 mr-7 flex items-center">
            <Link
              to="/login"
              className="mr-4 px-4 py-1.5 text-gray-700 border border-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-white hover:text-black"
            >
              Log in
            </Link>

            <Link to="/register" className="px-4 py-1.5 text-gray-100 bg-black font-semibold rounded-xl">
              Register
            </Link>
          </div>
        )}
      </div>
      {/* End of Desktop Nav */}

      <div className="flex items-center">
        {user && (
          <Link to="/profile">
            <img
              className="w-8 h-8 rounded-full bg-white md:w-10 md:h-10 md:mt-2"
              src="https://i.pinimg.com/originals/8a/13/ba/8a13babd54171ede85b5b40565698682.jpg"
              alt=""
            />
          </Link>
        )}
        {/* Logo */}
        <Link to="/">
          <img src="https://i.ibb.co/w7Bc5w7/Group-1.png" alt="logo" className="ml-3 h-10 w-10 md:mt-2" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
