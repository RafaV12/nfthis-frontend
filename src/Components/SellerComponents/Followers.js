import { Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";

const Followers = ({ followers, showFollowers, setShowFollowers }) => {
  // Animations
  const maskTransition = useTransition(showFollowers, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const listTransition = useTransition(showFollowers, {
    from: { transform: "translateY(100%)" },
    enter: { transform: "translateY(0%)" },
    leave: { transform: "translateY(100%)" },
  });

  return (
    <>
      {maskTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              onClick={() => setShowFollowers(!showFollowers)}
              className="bg-black bg-opacity-20 fixed top-0 left-0 w-full h-full"
            ></animated.div>
          )
      )}

      {listTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className="fixed flex flex-col items-center justify-center bottom-0 h-3/5 rounded-t-3xl w-full bg-white md:w-3/4 xl:w-2/4 z-20"
            >
              <h1 className="text-xl font-bold">Followers</h1>
              <div className="overflow-y-scroll p-3 h-4/5 w-3/4 flex flex-col">
                {followers.length > 0 ? (
                  followers.map((follower) => (
                    <Link
                      onClick={() => setShowFollowers(false)}
                      key={follower}
                      to={`/user/${follower}`}
                    >
                      <div className="m-2 flex items-center">
                        <img
                          src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png"
                          className="mr-2 h-12 w-12 rounded-full"
                          alt=""
                        />
                        <p>{follower}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">There are no followers yet</p>
                )}
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default Followers;
