import React, { useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer from './reducer';

const initialState = {
  user: undefined,
  isLoading: false,
  nfts: [],
  nft: null,
  sellers: [],
  seller: null,
  showAlert: false,
  editComplete: false,
  editObject: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  const fetchLoggedUser = async () => {
    setLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await axios.get('https://nfthis.onrender.com/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: 'FETCH_LOGGED_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_LOGGED_USER_ERROR' });
      localStorage.removeItem('token');
    }
  };

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post('https://nfthis.onrender.com/register', {
        ...userInput,
      });

      dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user.username });
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.user.username,
          token: data.token,
          userId: data.userId,
        })
      );
      // Redirect to home after successful registering
      window.location.replace('/');
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_ERROR', payload: error.response.data.msg });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post('https://nfthis.onrender.com/login', {
        ...userInput,
      });
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: data.user });
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.user.username,
          token: data.token,
          userId: data.userId,
        })
      );
    } catch (error) {
      dispatch({ type: 'LOGIN_USER_ERROR' });
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(false);
    dispatch({ type: 'LOGOUT_USER' });
  };

  // create
  const createNFT = async (userInput) => {
    setLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await axios.post(
        'https://nfthis.onrender.com/nfts/',
        {
          ...userInput,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({ type: 'CREATE_NFT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'CREATE_NFT_ERROR' });
    }
  };

  const fetchNfts = async () => {
    setLoading();
    try {
      const { data: nfts } = await axios.get(`https://nfthis.onrender.com/api/nfts`);
      dispatch({ type: 'FETCH_NFTS_SUCCESS', payload: nfts });
    } catch (error) {
      dispatch({ type: 'FETCH_NFTS_ERROR' });
    }
  };

  const fetchSingleNft = async (nftId) => {
    clearState();
    setLoading();
    try {
      const { data: nft } = await axios.get(`https://nfthis.onrender.com/api/nft/${nftId}`);
      dispatch({ type: 'FETCH_SINGLE_NFT_SUCCESS', payload: nft });
    } catch (error) {
      dispatch({ type: 'FETCH_SINGLE_NFT_ERROR' });
    }
  };

  const fetchSellers = async () => {
    clearState();
    setLoading();
    try {
      const { data: sellers } = await axios.get('https://nfthis.onrender.com/api/users');
      dispatch({ type: 'FETCH_SELLERS_SUCCESS', payload: sellers });
    } catch (error) {
      dispatch({ type: 'FETCH_SELLERS_ERROR' });
    }
  };

  const fetchSingleSeller = async (username) => {
    setLoading();
    try {
      const { data: seller } = await axios.get(`https://nfthis.onrender.com/api/user/${username}`);
      dispatch({ type: 'FETCH_SINGLE_SELLER_SUCCESS', payload: seller });
    } catch (error) {
      dispatch({ type: 'FETCH_SINGLE_SELLER_ERROR' });
    }
  };

  // Modify this later
  const clearState = () => {
    dispatch({ type: 'CLEAR_STATE' });
  };

  const clearAlert = () => {
    dispatch({ type: 'CLEAR_ALERT' });
  };

  const editUser = async (userInput) => {
    setLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    const { userId } = user;
    try {
      const { data } = await axios.patch(
        'https://nfthis.onrender.com/settings',
        {
          ...userInput,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Logout after updating the username successfully
      setTimeout(() => {
        window.location.reload(false);
        logout();
      }, 3000);
      dispatch({ type: 'EDIT_USER_SUCCESS', payload: data });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: 'EDIT_USER_ERROR' });
    }
  };

  const followUser = async (userToFollowId) => {
    setLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    const { username } = user;
    try {
      const { data } = await axios.patch(
        `https://nfthis.onrender.com/user/${userToFollowId}`,
        {
          loggedUserId: username,
          userToFollowId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Fetch seller to get the updated 'seller' global state in the Seller component
      fetchSingleSeller(userToFollowId);
      dispatch({ type: 'FOLLOW_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FOLLOW_USER_ERROR' });
    }
  };

  const unfollowUser = async (userToUnfollowId) => {
    setLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    const { username } = user;
    try {
      const { data } = await axios.patch(
        `https://nfthis.onrender.com/user/${userToUnfollowId}`,
        {
          loggedUserId: username,
          userToUnfollowId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Fetch seller to get the updated 'seller' global state in the Seller component
      fetchSingleSeller(userToUnfollowId);
      dispatch({ type: 'UNFOLLOW_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UNFOLLOW_USER_ERROR' });
    }
  };

  const deleteNft = async (nftId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await axios.delete(
        `https://nfthis.onrender.com/nfts/${nftId}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchLoggedUser();
      dispatch({ type: 'DELETE_NFT_SUCCESS', payload: data });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: 'DELETE_NFT_ERROR' });
    }
  };

  useEffect(() => {
    fetchLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        followUser,
        unfollowUser,
        clearState,
        clearAlert,
        setLoading,
        register,
        login,
        logout,
        createNFT,
        deleteNft,
        fetchLoggedUser,
        fetchNfts,
        fetchSingleNft,
        fetchSellers,
        fetchSingleSeller,
        editUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
