import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import Loader from './Loader';

const Nft = () => {
  const { id } = useParams();
  const { isLoading, fetchSingleNft, nft } = useGlobalContext();
  // Default NFT's values
  const [values, setValues] = useState({
    title: '',
    image: '',
    category: '',
    price: 0,
    owner: '',
    description: '',
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
    <div className="p-4 min-h-screen flex flex-col md:pb-14 md:justify-center xl:items-center">
      <div className="mt-14 container flex flex-col items-center md:px-4 md:mt-0 md:flex-row lg:px-16 lg:justify-between">
        {/* NFT image */}
        <div className="w-full flex flex-col md:w-3/5">
          <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-lg md:w-3/5">
            <img className="rounded-lg w-40 h-40" src={values.image} alt={values.title} />
          </div>
        </div>

        {/* Creator div*/}
        <div className="px-4 py-6 mt-4 w-full flex flex-col bg-white rounded-md border md:mt-0 md:w-2/5">
          <p className="font-semibold lg:text-xl ">Creator</p>
          <Link to={`/user/${values.owner}`}>
            <div className="mt-2 mb-4 flex items-center">
              <img
                src="https://i.pinimg.com/originals/8a/13/ba/8a13babd54171ede85b5b40565698682.jpg"
                className="mr-2 h-10 w-10 rounded-full"
                alt="creator-name"
              />
              <p className="text-lg font-semibold text-blue-600 lg:text-xl">{values.owner}</p>
            </div>
          </Link>
          <h1 className="text-3xl font-semibold mb-1">{values.title}</h1>
          <p className="text-lg text-gray-400">Category - {values.category}</p>

          <p className="mt-4 text-gray-600 lg:text-lg">{values.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Nft;
