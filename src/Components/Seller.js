import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import Error from '../Components/Error';
import Loader from './Loader';
import Followers from './SellerComponents/Followers';
import Following from './SellerComponents/Following';

const Seller = () => {
  const { username } = useParams();
  const { isLoading, fetchSingleSeller, seller, user, followUser, unfollowUser } = useGlobalContext();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  // Default seller's values
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    nfts: [],
    followers: [],
    following: [],
  });

  useEffect(() => {
    fetchSingleSeller(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (seller) {
      // Set seller's values using the ones coming from GlobalContext
      const { firstname, lastname, username, nfts, followers, following } = seller;
      setValues({ firstname, lastname, username, nfts, followers, following });
    }
  }, [seller]);

  if (isLoading || seller === null) {
    return <Loader />;
  }

  if (seller === '') {
    return <Error msg="User was not found!" status="404" />;
  }

  if (seller) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="mt-14 md:mt-28 flex flex-col items-center h-auto w-4/5">
          {/* Seller Info */}
          <img
            className="w-24 rounded-full mb-2"
            src="https://i.pinimg.com/originals/8a/13/ba/8a13babd54171ede85b5b40565698682.jpg"
            alt=""
          />
          <h1 className="text-xl font-bold">{values.firstname && values.lastname && `${values.firstname} ${values.lastname}`}</h1>
          <p className="text-gray-400">@{values.username}</p>

          {/* Created|Following|Followers layout*/}
          <div className="mt-10 flex items-center shadow rounded-lg justify-around">
            <div style={{ backgroundColor: '#1F51FF' }} className="text-center text-white w-28 shadow cursor-pointer p-2 rounded-l-lg">
              <p className="font-medium">{values.nfts.length}</p>
              <p className="font-medium">Created</p>
            </div>

            <div
              onClick={() => {
                setShowFollowing(!showFollowing);
              }}
              className="text-center w-28 bg-white cursor-pointer border-r-2 p-2"
            >
              <p>{values.following.length}</p>
              <p className="font-medium text-gray-800">Following</p>
            </div>

            <div
              onClick={() => {
                setShowFollowers(!showFollowers);
              }}
              className="text-center w-28 bg-white cursor-pointer p-2 rounded-r-lg"
            >
              <p>{values.followers.length}</p>
              <p className="font-medium text-gray-800">Followers</p>
            </div>
          </div>

          {/* Followers and Following modals*/}
          <Followers followers={values.followers} setShowFollowers={setShowFollowers} showFollowers={showFollowers} />
          <Following following={values.following} showFollowing={showFollowing} closeFollowing={() => setShowFollowing(false)} />

          {/* Only show us the 'Follow' button IF there's a logged user and said user
          isn't following already */}
          {user &&
            user.username !== values.username &&
            (!values.followers.includes(user.username) ? (
              <button
                onClick={() => {
                  followUser(username);
                }}
                className="mt-7 mb-4 h-10 w-80 border-2 rounded-lg"
              >
                Follow
              </button>
            ) : (
              <div className="w-full flex items-center justify-center">
                <i className="mt-2 mr-3 text-xl text-blue-500 fa-solid fa-user-check"></i>
                <button
                  onClick={() => {
                    unfollowUser(username);
                  }}
                  className="mt-7 mb-4 h-10 w-32 border-2 rounded-lg"
                >
                  Unfollow
                </button>
              </div>
            ))}

          {/* Array of NFTs created by seller*/}
          <div style={{ maxWidth: '1300px' }} className="pl-2 w-full mt-10">
            <h1 className="text-lg font-medium text-gray-600">NFTs Created</h1>
          </div>
          <div style={{ maxWidth: '1300px' }} className="mb-14 flex flex-wrap justify-around items-center w-full">
            {values.nfts.length > 0 ? (
              values.nfts.map((nft) => (
                <Link key={nft._id} to={`/nft/${nft._id}`}>
                  <img src={nft.image} className="m-2 rounded-lg h-64 w-64" alt="" />
                </Link>
              ))
            ) : (
              <p className="mt-3 px-4 py-2 text-gray-500 bg-gray-200 border rounded-md">{values.username} has not created any NFT yet</p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Seller;
