import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const { user, login, isLoading, showAlert, clearAlert } = useGlobalContext();

  // Clear alerts after 2 secs
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        clearAlert();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;

    login({ username, password });
  };

  return (
    <div className="min-h-screen py-7 px-7 flex justify-center items-center">
      {user && <Redirect to="/" />}
      <div className="h-full container flex flex-col items-center lg:flex-row lg:justify-between xl:w-4/5">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center text-black w-80 lg:-mt-10">
          <h1 className="text-blue-600 text-3xl font-semibold">NFThis</h1>
          <p className="mt-2 text-lg text-gray-500 leading-5">Discover developers, assets and helpful resources fast and securely.</p>
        </div>

        {/* Form container */}
        <div className="relative container px-7 pt-4 pb-7 mt-14 w-full flex flex-col items-center bg-white shadow-md border-t rounded-xl md:w-2/4 lg:w-2/5 lg:mt-0 xl:w-2/6">
          <img
            className="absolute -top-8 -z-10 w-14 h-14"
            src="https://imagetostl.com/assets/nft-animation/_/original/0/platy-punk-animated"
            alt=""
          />
          {/* Sign in Form */}
          <form onSubmit={onSubmit} className="w-full h-full flex flex-col">
            <label htmlFor="username" className="mt-6">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={values.user}
              onChange={handleChange}
              className="mt-2 mb-4 pl-4 h-10 w-full bg-white bg-opacity-10 border outline-none rounded-md"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="mt-2 pl-4 h-10 w-full bg-white bg-opacity-10 border outline-none rounded-md"
              placeholder="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />

            {showAlert && <div className="mt-2 text-red-500 font-md">Invalid credentials. Try again.</div>}

            <button
              type="submit"
              className="mt-7 w-full h-12 flex items-center justify-center bg-blue-500 font-semibold rounded-md outline-none text-white shadow-md"
            >
              {isLoading ? 'Fetching User...' : 'Log in'}
            </button>
          </form>

          <p className="mt-7 text-gray-700 font-semibold">
            Don't have an account?
            <Link to={'/register'} className="ml-2 underline">
              Register!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
