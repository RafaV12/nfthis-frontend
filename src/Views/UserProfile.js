import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import DeleteModal from '../Components/DeleteModal';
import Followers from '../Components/SellerComponents/Followers';
import Following from '../Components/SellerComponents/Following';
import Error from '../Components/Error';

const UserProfile = () => {
  const { isLoading, user, clearState, fetchLoggedUser } = useGlobalContext();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  const closeModal = () => {
    setShowModal(!showModal);
    document.body.style.overflow = 'unset';
    clearState();
  };

  useEffect(() => {
    fetchLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return <Error msg={'Invalid Credentials!'} status={'401'} />;
  }

  if (user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="mt-14 md:mt-20 flex flex-col items-center h-auto w-4/5">
          {/* User info */}
          <img
            className="w-24 rounded-lg mb-2"
            src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png"
            alt=""
          />
          <h1 className="text-xl font-bold">
            {user.firstname} {user.lastname}
          </h1>
          <p className="text-gray-400">@{user.username}</p>

          {/* Created|Following|Followers layout*/}
          <div className="mt-10 flex items-center shadow rounded-lg justify-around">
            <div style={{ backgroundColor: '#1F51FF' }} className="text-center text-white w-28 shadow cursor-pointer p-2 rounded-l-lg">
              <p className="font-medium">{user.nfts.length}</p>
              <p className="font-medium">Created</p>
            </div>

            <div
              onClick={() => {
                setShowFollowing(!showFollowing);
              }}
              className="text-center w-28 bg-white cursor-pointer border-r-2 p-2"
            >
              <p>{user.following.length}</p>
              <p className="font-medium text-gray-800">Following</p>
            </div>

            <div
              onClick={() => {
                setShowFollowers(!showFollowers);
              }}
              className="text-center w-28 bg-white cursor-pointer p-2 rounded-r-lg"
            >
              <p>{user.followers.length}</p>
              <p className="font-medium text-gray-800">Followers</p>
            </div>
          </div>

          {/* Followers and Following buttons*/}
          <Followers followers={user.followers} setShowFollowers={setShowFollowers} showFollowers={showFollowers} />
          <Following following={user.following} showFollowing={showFollowing} closeFollowing={() => setShowFollowing(false)} />

          <Link to={'/create'}>
            <button className="mt-7 mb-4 h-10 w-80 text-white rounded-lg text-center bg-blue-500">Create</button>
          </Link>

          <Link to={'/settings'}>
            <button className="mb-4 h-10 w-80 border-2 rounded-lg">Edit profile</button>
          </Link>

          {/* Array of NFTs created by user*/}
          <div style={{ maxWidth: '1300px' }} className="w-full mt-10">
            <h1 className="text-lg font-medium text-gray-600">NFTs Created</h1>
          </div>
          <div style={{ maxWidth: '1300px' }} className="p-4 pb-14 flex flex-wrap justify-around items-center w-full">
            {user.nfts.length > 0
              ? user.nfts.map((nft) => (
                  <div
                    key={nft._id}
                    className="relative mb-9 w-80 h-80 rounded-lg shadow-sm"
                    style={{
                      backgroundImage: `url(${nft.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <Link to={`/nft/${nft._id}`}>
                      <div className="w-full h-full">
                        <p className="m-5 font-bold text-gray-700">{nft.title}</p>
                      </div>
                    </Link>

                    <i
                      onClick={() => {
                        setActiveObject(nft);
                        setShowModal(!showModal);
                      }}
                      className="absolute px-1 bg-white shadow-md bottom-4 right-6 text-xl fa-solid fa-trash rounded-md z-10 cursor-pointer"
                    ></i>
                  </div>
                ))
              : 'There are no NFTs yet'}
          </div>
        </div>
        {showModal && <DeleteModal activeObject={activeObject} closeModal={closeModal} showModal={showModal} />}
      </div>
    );
  }
};

export default UserProfile;
