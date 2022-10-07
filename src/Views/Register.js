import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    isMember: true,
  });

  const { user, register, isLoading, showAlert } = useGlobalContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;

    register({ username, password });
  };

  return (
    <div className="min-h-screen pt-20 pb-14 px-7 flex justify-center items-center lg:pt-32">
      {user && <Redirect to="/" />}
      {/* {showAlert && (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center border-t text-red-500 font-semibold bg-white p-7 text-lg z-10 rounded-md shadow-lg">
          {error}
        </p>
      )} */}
      <div className="h-full container flex flex-col items-center lg:flex-row lg:justify-between xl:w-4/5">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center text-black w-80 lg:-mt-10">
          <h1 className="text-blue-600 text-3xl font-semibold">NFThis</h1>
          <p className="mt-2 text-lg  text-gray-500 leading-5">
            Discover developers, assets and helpful resources fast and securely.
          </p>
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
            <label htmlFor="name" className="mt-6">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={values.username}
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

            {values.password.length === 0 ? (
              <p className="mt-1 text-sm text-gray-400">
                At least 5 characters
              </p>
            ) : values.password.length > 0 && values.password.length < 5 ? (
              <p className="mt-1 text-red-500 font-md">Password is weak!</p>
            ) : (
              <p className="mt-1 text-green-500 font-md">Password is good!</p>
            )}

            <label htmlFor="repeat-password" className="mt-4">
              Repeat Password
            </label>
            <input
              type="password"
              className="mt-2 pl-4 h-10 w-full bg-white bg-opacity-10 border outline-none rounded-md"
              placeholder="Repeat password"
              name="repeatPassword"
              value={values.repeatPassword}
              onChange={handleChange}
              required
            />
            {values.password !== values.repeatPassword && (
              <p className="mt-1 text-red-500 font-md">
                Passwords do not match!
              </p>
            )}

            <button
              type="submit"
              disabled={
                values.password !== values.repeatPassword ? 'disabled' : false
              }
              className="mt-7 w-full h-12 flex items-center justify-center bg-blue-500 font-semibold rounded-md outline-none text-white shadow-md"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>

          <p className="mt-7 text-gray-700 font-semibold">
            Already have an account?
            <Link to={'/login'} className="ml-2 underline">
              Sign in!
            </Link>
          </p>

          <p className="mt-4 text-center text-gray-400">
            By registering you are agreeing to the
            <span className="text-blue-400"> Terms of Service </span>
            and ackowledge the
            <span className="text-blue-400"> Privacy Policy </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
