const reducer = (state, action) => {
  if (action.type === 'SET_LOADING') {
    return { ...state, isLoading: true, showAlert: false, editComplete: false };
  }

  if (action.type === 'CLEAR_STATE') {
    return {
      ...state,
      isLoading: false,
      nft: null,
      seller: null,
      showAlert: false,
      editComplete: false,
      editObject: null,
    };
  }

  if (action.type === 'CLEAR_ALERT') {
    return {
      ...state,
      showAlert: false,
    };
  }

  if (action.type === 'SET_USER') {
    return { ...state, user: action.payload, showAlert: false };
  }

  if (action.type === 'FETCH_LOGGED_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      user: action.payload,
    };
  }

  if (action.type === 'FETCH_LOGGED_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      user: null,
    };
  }

  if (action.type === 'REGISTER_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      user: action.payload,
    };
  }

  if (action.type === 'REGISTER_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: action.payload,
    };
  }

  if (action.type === 'LOGIN_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      user: action.payload,
    };
  }

  if (action.type === 'LOGIN_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: true,
    };
  }

  if (action.type === 'CREATE_NFT_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      nft: action.payload,
    };
  }

  if (action.type === 'CREATE_NFT_ERROR') {
    return {
      ...state,
      isLoading: false,
      nft: null,
      showAlert: true,
    };
  }

  if (action.type === 'LOGOUT_USER') {
    return {
      ...state,
      user: undefined,
      isLoading: false,
      nfts: [],
      nft: null,
      sellers: [],
      seller: null,
      showAlert: false,
    };
  }

  if (action.type === 'FETCH_NFTS_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      nfts: action.payload,
    };
  }

  if (action.type === 'FETCH_NFTS_ERROR') {
    return { ...state, isLoading: false };
  }

  if (action.type === 'FETCH_SELLERS_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      sellers: action.payload,
    };
  }
  if (action.type === 'FETCH_SELLERS_ERROR') {
    return { ...state, isLoading: false };
  }

  if (action.type === 'FETCH_SINGLE_SELLER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      seller: action.payload,
      showAlert: false,
    };
  }
  if (action.type === 'FETCH_SINGLE_SELLER_ERROR') {
    return { ...state, isLoading: false, seller: '', singleSellerError: true };
  }

  if (action.type === 'FETCH_SINGLE_NFT_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      nft: action.payload,
      showAlert: false,
    };
  }
  if (action.type === 'FETCH_SINGLE_NFT_ERROR') {
    return { ...state, isLoading: false, nft: '', singleNftError: true };
  }

  if (action.type === 'DELETE_NFT_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      nft: action.payload,
    };
  }

  if (action.type === 'DELETE_NFT_ERROR') {
    return {
      ...state,
      isLoading: false,
      nft: null,
      showAlert: true,
    };
  }

  if (action.type === 'EDIT_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      editObject: action.payload,
      editComplete: true,
    };
  }

  if (action.type === 'EDIT_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    };
  }

  if (action.type === 'FOLLOW_USER_SUCCESS' || action.type === 'UNFOLLOW_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      editComplete: action.payload,
    };
  }

  if (action.type === 'FOLLOW_USER_ERROR' || action.type === 'UNFOLLOW_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    };
  }
  throw new Error(`no such action : ${action}`);
};

export default reducer;
