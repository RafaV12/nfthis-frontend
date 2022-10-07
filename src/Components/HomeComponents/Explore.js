import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import SortMenu from "./SortMenu";
import Loader from "../Loader";

const Explore = () => {
  const { isLoading, nfts } = useGlobalContext();
  const [showSort, setShowSort] = useState(false);
  const [numOfElem, setNumOfElem] = useState(6);
  const [exploreNfts, setExploreNfts] = useState([]);
  const categories = [...new Set(nfts.map((nft) => nft.category))];

  useEffect(() => {
    if (nfts) {
      setExploreNfts(nfts);
    }
  }, [nfts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="w-full h-full xl:flex xl:flex-col xl:items-center"
      onClick={() => {
        if (showSort) {
          setShowSort(!showSort);
        }
      }}
    >
      <div
        style={{ maxWidth: "1300px" }}
        className="flex items-center justify-between h-20 w-full"
      >
        <button
          className="w-10 hover:bg-black hover:text-white transition duration-300 ease-in-out shadow"
          onClick={() => {
            setExploreNfts(nfts);
          }}
        >
          All
        </button>
        <div className="mx-2 flex items-center overflow-x-scroll w-4/6 h-16 sm:h-14">
          {categories.map((category) => (
            <p
              key={categories.indexOf(category)}
              className="mr-2 cursor-pointer w-24 font-bold text-gray-800 text-sm"
              onClick={() => {
                setExploreNfts(() =>
                  nfts.filter((nft) => nft.category === category)
                );
              }}
            >
              {category}
            </p>
          ))}
        </div>
        <SortMenu
          setShowSort={setShowSort}
          nfts={exploreNfts}
          showSort={showSort}
        />
      </div>
      <div className="flex flex-col mt-4 items-center justify-center w-full md:flex-row md:flex-wrap">
        {exploreNfts.length === 0 ? (
          <>There are no NFTs to see...</>
        ) : (
          exploreNfts.slice(0, numOfElem).map((nft) => (
            <Link key={nft._id} to={`/nft/${nft._id}`}>
              <div className="relative flex flex-col justify-evenly items-center h-80 m-2 w-72">
                <img
                  src={nft.image}
                  className="absolute top-0 z-10 rounded-2xl w-64 h-56 hover:shadow-blue transition duration-300 ease-in-out"
                  alt=""
                />
                <div className="pl-6 pb-3 bg-white bg-opacity-70 flex flex-col justify-end absolute bottom-5 z-1 h-56 rounded-lg shadow-lg border-t-2 w-72">
                  <p>{nft.title}</p>
                  <div className="flex items-center">
                    <i className="fab fa-ethereum  mr-2"></i>
                    <p className="font-bold">{nft.price} ETH</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}

        {exploreNfts.length > 5 && (
          <button
            className="my-5 p-2 w-full border-2 border-black hover:bg-black hover:text-white transition duration-300 ease-in-out font-bold rounded-lg"
            onClick={() => setNumOfElem((prev) => prev + 6)}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
