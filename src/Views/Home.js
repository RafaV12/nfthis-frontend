import { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import FeaturedNfts from '../Components/HomeComponents/FeaturedNfts';
import LiveAuctions from '../Components/HomeComponents/LiveAuctions';
import FeaturedSellers from '../Components/HomeComponents/FeaturedSellers';
import Explore from '../Components/HomeComponents/Explore';
import Footer from '../Components/Footer';

const Home = () => {
  const { fetchNfts, fetchSellers } = useGlobalContext();
  const exploreRef = useRef(null);
  const executeScroll = () => exploreRef.current.scrollIntoView();

  useEffect(() => {
    fetchNfts();
    fetchSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="pb-20 xl:flex xl:flex-col xl:items-center">
        {/* Landing Page */}
        <div className="pt-12 pb-12 px-6 w-full min-h-screen bg-white flex items-center 2xl:justify-center">
          <div
            style={{ maxWidth: '1300px' }}
            className="w-full flex items-center md:justify-around"
          >
            <div className="p-4 flex flex-col md:w-2/4">
              <h1 className="mt-2 text-4xl font-bold text-blue-600">NFThis</h1>
              <h1 className="mt-5 text-6xl font-semibold">
                Collect Digital Art
              </h1>
              <p className="mt-3 font-medium text-xl text-gray-400">
                Buy and sell NFTs from the world's top artists.
              </p>

              <img
                src="https://www.itl.cat/pngfile/big/4-43065_anime-wallpaper-gif-1080p.jpg"
                alt=""
                className="mt-7 h-2/4 w-full md:hidden"
              />

              <div className="mt-10 mb-10 flex flex-wrap self-center justify-between items-center text-lg md:mt-10 md:mb-0 md:self-start">
                <button
                  onClick={executeScroll}
                  className="px-7 mr-7 h-14 text-gray-700 tracking-wider font-semibold border border-gray-700 rounded-lg md:w-48 md:mr-7 md:mb-3 lg:mb-0"
                >
                  Explore
                </button>
                <Link to={'/create'}>
                  <button className="px-8 h-14 bg-blue-500 text-white  tracking-wider font-semibold rounded-lg md:w-48">
                    Create
                  </button>
                </Link>
              </div>
            </div>

            <img
              src="https://c.tenor.com/4wXXew-wOIQAAAAd/shinsekai-nft.gif"
              alt=""
              style={{ maxHeight: '400px' }}
              className="hidden md:block rounded-lg"
            />
          </div>
        </div>
        {/* End of Landing Page */}

        <div className="p-3 container flex flex-col items-center">
          {/* Top NFT */}
          <div
            style={{
              backgroundImage:
                'url("https://static.wixstatic.com/media/4ebe41_b9ea9d33f44a48fbb1888ff07339e5ad~mv2.gif")',
            }}
            className="relative bg-center mt-20 w-72 h-32 rounded-lg shadow-lg"
          >
            <p className="p-3 font-delagothicone text-white text-sm">
              Top NFT of the week!
            </p>
          </div>

          <h1 className="font-delagothicone mt-16 mb-3 text-2xl w-full">
            Featured NFTs
          </h1>
          <FeaturedNfts />

          <h1 className="font-delagothicone mt-16 mb-4 text-2xl">
            Live auctions
          </h1>
          <LiveAuctions />

          <h1 className="font-delagothicone mt-16 mb-3 text-2xl w-full">
            We recommend
          </h1>
          <FeaturedSellers />

          <h1
            ref={exploreRef}
            className="font-delagothicone mt-16 mb-4 text-2xl w-full"
          >
            Explore
          </h1>
          <Explore />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
