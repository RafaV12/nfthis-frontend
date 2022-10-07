import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import { useTransition, animated } from 'react-spring';
import Loader from './Loader';

const Nft = () => {
  const { id } = useParams();
  const { isLoading, fetchSingleNft, nft } = useGlobalContext();
  const [showError, setShowError] = useState(false); // Animation modal
  // Default NFT's values
  const [values, setValues] = useState({
    title: '',
    image: '',
    category: '',
    price: 0,
    owner: '',
    description: '',
  });

  // Animations
  const maskTransition = useTransition(showError, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const errorTransition = useTransition(showError, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
  });

  useEffect(() => {
    fetchSingleNft(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (nft) {
      // Set NFT's values using the ones coming from GlobalContext
      const { title, price, category, description, image, owner } = nft;
      setValues({
        title,
        price,
        category,
        description,
        image,
        owner,
      });
    }
  }, [nft]);

  if (isLoading && !nft) {
    return <Loader />;
  }

  if (!nft) {
    return (
      <>
        <h5>There was an error, please double check the NFT's ID</h5>
      </>
    );
  }

  return (
    <div className="p-4 md:pb-14 flex flex-col min-h-screen xl:items-center md:justify-center">
      <div className="mt-14 container flex flex-col md:mt-20 lg:justify-between md:flex-row">
        {/* NFT */}
        <div className="flex flex-col">
          <p className="text-lg text-gray-400">{values.category}</p>
          <h1 className="text-3xl font-bold mb-4">{values.title}</h1>
          <img
            className="rounded-lg md:w-11/12 xl:w-full"
            src={values.image}
            alt={values.title}
          />
        </div>

        <div className='flex flex-col md:w-2/5 md:justify-end lg:justify-center lg:pt-14'>
          {/* Creator div*/}
          <div className="px-2 md:flex md:flex-col md:justify-center">
            <p className="font-bold mt-4 lg:text-2xl ">Creator</p>
            <div className="mt-2 mb-4 flex items-center">
              <img
                src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png"
                className="mr-2 h-10 w-10 rounded-full"
                alt="creator-name"
              />
              <Link to={`/user/${values.owner}`}>
                <p className="text-lg  text-blue-600 font-bold lg:text-xl">
                  @<span className="ml-0.5 text-black">{values.owner}</span>
                </p>
              </Link>
            </div>

            <p className="mb-6 text-gray-600 lg:text-lg">
              {values.description}
            </p>
          </div>

          {/* Buy and place bid Buttons */}
          <div className="mt-7 h-12 w-full flex items-center rounded-lg xs:justify-center md:justify-center xl:justify-start">
            <button
              onClick={() => setShowError(!showError)}
              className="mr-3 w-48 h-12 text-white bg-blue-600 font-bold rounded-full md:mr-8"
            >
              Buy for {values.price} ETH
            </button>
            <button
              onClick={() => setShowError(!showError)}
              className="w-48 h-12 border-2 border-2 border-gray-800 text-gray-700 font-bold rounded-full"
            >
              Place a bid
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <div className="w-full h-full">
        {maskTransition(
          (styles, item) =>
            item && (
              <animated.div
                style={styles}
                className="bg-black bg-opacity-20 fixed top-0 left-0 w-full h-full"
                onClick={() => setShowError(false)}
              ></animated.div>
            )
        )}
        {errorTransition(
          (styles, item) =>
            item && (
              <animated.div
                style={styles}
                className="p-2 fixed flex items-center justify-center bottom-0 h-1/5 w-full bg-white rounded-t-3xl"
              >
                <p className="text-xl">This is a mock-up site!</p>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};

export default Nft;
