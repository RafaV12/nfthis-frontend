import { AiFillCaretDown } from "react-icons/ai";

const SortMenu = ({ nfts, setShowSort, showSort }) => {
  return (
    <div
      className="flex flex-col items-center border-2 border-black font-medium cursor-pointer rounded-lg w-1/4 sm:w-24 text-center hover:bg-black hover:text-white transition duration-300 ease-in-out"
      onClick={() => setShowSort(!showSort)}
    >
      <div className="flex items-center justify-around w-full">
        <p>Sort by</p>
        <AiFillCaretDown className="mt-1" />
      </div>
      {showSort && (
        <div
          className="absolute right-0 mt-7 py-2 w-48 bg-white rounded-md shadow z-20"
          onClick={() => setShowSort(!showSort)}
        >
          <p
            onClick={() => {
              nfts.sort(function (a, b) {
                return a.price - b.price;
              });
            }}
            className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
          >
            Cheapest
          </p>
          <p
            onClick={() => {
              nfts.sort(function (a, b) {
                return b.price - a.price;
              });
            }}
            className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
          >
            Highest price
          </p>
          <p
            onClick={() => {
              nfts.sort(function (a, b) {
                return b.id - a.id;
              });
            }}
            className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
          >
            Recently added
          </p>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
