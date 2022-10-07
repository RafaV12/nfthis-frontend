import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import Loader from "../Loader";

const FeaturedNfts = () => {
  const { isLoading, nfts } = useGlobalContext();
  let featuredNfts = nfts.filter((nft) => nft.featured === true);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex overflow-x-scroll  items-center h-72 w-full">
      {featuredNfts.length === 0
        ? "There are no featured NFTs yet"
        : featuredNfts.map((nft) => (
            <div
              key={nft._id}
              className="m-2 p-2 bg-white shadow-md rounded-lg flex flex-col justify-around h-64 min-w-max"
            >
              <Link to={`/nft/${nft._id}`}>
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="h-48 w-48 rounded-lg transform transition duration-500 hover:scale-110 hover:shadow-md"
                />
                <p className="ml-1 mt-2 font-bold text-gray-800 text-sm">
                  {nft.title}
                </p>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default FeaturedNfts;
