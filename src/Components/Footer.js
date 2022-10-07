import {
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialFacebookCircular,
} from 'react-icons/ti';

const Footer = () => {
  return (
    <footer className="mt-7 px-4 w-full flex flex-col items-center justify-between">
      {/* <img
        src="https://i.ibb.co/djPF91c/nfthis-logo.png"
        alt=""
        className="h-24 w-26 mt-12"
      /> */}

      {/* Subscribe form */}
      <div>
        <h2 className="text-black font-semibold text-lg">
          Get the lastest NFThis updates, highlights and team activites.
        </h2>
        <form
          className="relative mt-4 flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Sign up successfull');
          }}
        >
          <input
            type="email"
            placeholder="Your email"
            className="pl-4 w-full border bg-gray-100 h-12 outline-none rounded-lg"
            maxLength="30"
            required
          />
          <input
            type="submit"
            className="absolute right-2 h-8 text-xs p-2 font-semibold text-white bg-black rounded-lg"
            value="Sign up"
          ></input>
        </form>
      </div>

      {/* Nav Links */}
      <div className="mt-7 w-full flex justify-between md:justify-evenly lg:justify-center lg:w-2/4 xl:w-2/6 2xl:w-1/5">
        <div className="w-2/4 md:w-1/4 lg:w-2/4">
          <h3 className="font-semibold text-lg">Marketplace</h3>
          <ul>
            <li className="mt-3 font-semibold text-gray-400">Explore</li>
            <li className="mt-3 font-semibold text-gray-400">
              Community Marketplace
            </li>
            <li className="mt-3 font-semibold text-gray-400">Blog</li>
            <li className="mt-3 font-semibold text-gray-400">How it Works</li>
            <li className="mt-3 font-semibold text-gray-400">Jobs</li>
          </ul>
        </div>

        <div className="w-2/5 md:w-1/4 lg:w-2/4">
          <h3 className="font-semibold text-lg">Links</h3>
          <ul>
            <li className="mt-3 font-semibold text-gray-400">Home</li>
            <li className="mt-3 font-semibold text-gray-400">Search</li>
            <li className="mt-3 font-semibold text-gray-400">About</li>
            <li className="mt-3 font-semibold text-gray-400">Login</li>
            <li className="mt-3 font-semibold text-gray-400">Register</li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-16 pb-9 container flex justify-center border-b">
        <div className="w-2/4 flex items-center justify-around lg:w-1/4 ">
          <TiSocialTwitter className="cursor-pointer text-3xl text-gray-500" />
          <TiSocialYoutube className="cursor-pointer text-3xl text-gray-500" />
          <TiSocialFacebookCircular className="cursor-pointer text-3xl text-gray-500" />
          <TiSocialInstagram className="cursor-pointer text-3xl text-gray-500" />
        </div>
      </div>

      <div className="py-9 flex container text-sm text-gray-400 flex-col justify-center items-center">
        <ul className="w-full flex items-center justify-around">
          <li>Community guidelines</li>
          <li>Terms</li>
          <li>Privacy Policy</li>
        </ul>
        <p className="mt-7">© NFThis, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
