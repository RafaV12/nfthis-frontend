import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import {
  HiOutlineArrowCircleRight,
  HiOutlineArrowCircleLeft,
  HiOutlineEye,
} from "react-icons/hi";
import Loader from "../Loader";

const LiveAuctions = () => {
  const { isLoading, nfts } = useGlobalContext();
  const [current, setCurrent] = useState(0);

  // Slider
  const nextSlide = () => {
    setCurrent(current === auctionList.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? auctionList.length - 1 : current - 1);
  };

  let auctionList = nfts.filter((nft) => nft.inAuction === true);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center w-full justify-center">
      <HiOutlineArrowCircleLeft
        className="cursor-pointer text-gray-500 text-4xl mr-4"
        onClick={prevSlide}
      />
      {auctionList.length === 0
        ? "There are no NFTs in auction"
        : auctionList.map((nft, index) => (
            <div key={nft._id}>
              {index === current && (
                <Link to={`/nft/${nft._id}`}>
                  <div className="relative animate-fade-in flex bg-white bg-opacity-70 flex-col items-center justify-center w-72 h-72 rounded-2xl shadow-lg">
                    <img
                      className="w-64 h-52 rounded-2xl"
                      src={nft.image}
                      alt={nft.title}
                    />
                    <div className="w-60 mt-2">
                      <h1 className="font-medium text-gray-800">{nft.title}</h1>
                      <p className="font-bold">{nft.price} ETH</p>
                    </div>
                    <div className="flex absolute justify-around items-center w-12 bottom-4 right-4 text-lg">
                      <HiOutlineEye />
                      <p>7</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
      <HiOutlineArrowCircleRight
        className="cursor-pointer text-gray-500 text-4xl ml-4"
        onClick={nextSlide}
      />
    </div>
  );
};

export default LiveAuctions;
