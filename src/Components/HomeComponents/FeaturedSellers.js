import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import Loader from "../Loader";

const FeaturedSellers = () => {
  const { isLoading, sellers } = useGlobalContext();
  let recommendedSellers = sellers.filter(
    (seller) => seller.recommended === true
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex overflow-x-scroll items-center w-full">
      {recommendedSellers.length === 0
        ? "There are no recommended sellers yet"
        : recommendedSellers.map((seller) => (
            <div
              key={seller._id}
              className="flex justify-around bg-white shadow-sm items-center p-3 m-3 min-w-max rounded-3xl transform transition duration-500 hover:scale-110 hover:shadow-md"
            >
              <Link
                to={`/user/${seller.username}`}
                className="flex items-center min-w-max"
              >
                <img
                  src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png"
                  alt=""
                  className="w-16 h-16 rounded-2xl mr-4"
                />
                <div>
                  <p className="mr-4 font-bold">{seller.username}</p>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default FeaturedSellers;
