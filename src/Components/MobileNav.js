import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { useGlobalContext } from '../context/appContext';

const MobileNav = ({ closeMenu }) => {
  const { user, logout } = useGlobalContext();
  return (
    <nav className="absolute top-0 left-0 p-3 rounded-r-lg bg-white w-48 h-screen z-50 shadow p-3">
      <ul>
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center text-blue-500 py-3 block border-b"
        >
          Home <AiFillHome className="ml-2 " />
        </Link>

        <Link
          to="/search"
          onClick={closeMenu}
          className="flex items-center text-blue-500 py-3 block border-b"
        >
          Search <AiOutlineSearch className="ml-2" />
        </Link>

        <Link
          to="/about"
          onClick={closeMenu}
          className="flex items-center text-blue-500 py-3 block border-b"
        >
          About
        </Link>

        {!user && (
          <div>
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center text-blue-500 py-3 block border-b"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="flex items-center text-blue-500 py-3 block"
            >
              Register
            </Link>
          </div>
        )}

        {user && (
          <>
            <Link onClick={closeMenu} to="/profile">
              <button className="w-full flex items-center text-blue-500 py-3 block">
                My Profile
              </button>
            </Link>
            <Link onClick={closeMenu} to="/settings">
              <button className="w-full flex items-center text-blue-500 py-3 block border-t">
                Settings
              </button>
            </Link>
            <Link onClick={closeMenu} to="/create">
              <button className="mt-10 mb-4 h-10 w-full text-white bg-blue-500 rounded-lg">
                Create
              </button>
            </Link>
            <button
              onClick={logout}
              className="mb-4 h-10 w-full text-black border-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
