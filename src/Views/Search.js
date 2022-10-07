import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

const Search = () => {
  const { fetchNfts, nfts } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="flex flex-col container items-center min-h-screen lg:pt-20">
        <img
          src="https://i.ibb.co/djPF91c/nfthis-logo.png"
          alt=""
          className="mt-14 h-32 w-32 md:h-40 md:w-40"
        />
        <p className="mt-4 text-2xl font-semibold w-3/5 md:2/4 md:text-3xl lg:w-2/3 xl:w-1/3 text-gray-700 lg:text-5xl text-center">
          Community-centric NFT marketplace
        </p>
        <input
          type="text"
          className="mt-10 pl-4 py-2 md:py-4 bg-gray-100 pl-3 rounded-md w-2/4 outline-none"
          placeholder="Search for NFT name"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="mt-10">
          {nfts
            .filter((nft) => {
              if (searchTerm === '') {
                return null;
              } else if (
                nft.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return nft;
              } else {
                return null;
              }
            })
            .map((nft) => (
              <Link key={nft._id} to={`/nft/${nft._id}`}>
                <div
                  style={{ backgroundImage: `url("${nft.image}")` }}
                  className="h-64 w-64 bg-cover bg-center mb-8 rounded-3xl p-6"
                >
                  <p className="font-bold font-xl text-white">{nft.title}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
