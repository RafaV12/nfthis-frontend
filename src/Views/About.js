import Footer from '../Components/Footer';

const About = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="px-4 pt-20 pb-14 md:pt-20 container">
        <h1 className="mb-3 text-3xl md:mt-7">What is an NFT?</h1>
        <div className="flex text-gray-400 flex-col justify-between">
          <p>
            NFT stands for non-fungible tokens like ERC-721 (a smart contract
            standard) tokens which are hosted on Ethereum’s own blockchain. NFTs
            are unique digital items such as collectibles or artworks or game
            items.
          </p>
          <p className="mt-2">
            As an artist, by tokenizing your work you both ensure that it is
            unique and brand it as your work. The actual ownership is
            blockchain-managed.
          </p>
          <p className="mt-2">
            “Non-fungible” more or less means that it’s unique and can’t be
            replaced with something else.
          </p>
        </div>
        <h2 className="mt-6 text-2xl mb-3">How do NFTs work?</h2>
        <p className="text-gray-400">
          At a very high level, most NFTs are part of the Ethereum blockchain.
          Ethereum is a cryptocurrency, like bitcoin or dogecoin, but its
          blockchain also supports these NFTs, which store extra information
          that makes them work differently from, say, an ETH coin. It is worth
          noting that other blockchains can implement their own versions of
          NFTs.
        </p>
      </div>

      <div className="px-8 py-14 w-full flex flex-col items-center bg-white bg-gray-100 justify-center">
        <img
          src="https://i.ibb.co/djPF91c/nfthis-logo.png"
          alt=""
          className="mb-7 h-24 w-26"
        />
        <p className="text-center  text-gray-400 text-xl">
          <span className="font-bold text-black">NFThis</span> is a website
          allowing digital artists and creators to issue and sell custom crypto
          assets that represent ownership in their digital work. <br />
          NFThis is both a marketplace for those assets, as well as a
          distributed network built on Ethereum that enables their trade without
          a middleman.
        </p>
      </div>

      <div className="px-4 pt-20 pb-14 md:pt-14 container">
        <h1 className="mb-3 text-2xl">Why do NFTs have value?</h1>
        <div className="flex text-gray-400 flex-col">
          <p>
            As we’ve mentioned already, a non-fungible token is essentially a
            certificate of ownership for a digital asset. The value comes from
            the collectibility of that asset, as well as its potential future
            sale value. NFTs can be sold and traded.
          </p>
          <p className="mt-2">
            Again, using art is a great example of the value of NFTs. In
            February 2021, digital artist Beeple sold the NFT for their
            Everydays – The First 5000 Days artwork for a staggering $69.3
            million through Christie’s auction house.
          </p>
        </div>
        <h2 className="mt-6 mb-3 text-2xl">
          Are non-fungible tokens the future?
        </h2>
        <p className="text-gray-400">
          It’s hard to say whether NFTs will be widely used over the years to
          come. Clearly, there is a huge interest in them at the moment, as well
          as several potential benefits. However, the technology is in its
          relative infancy, and there are numerous challenges to overcome.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
