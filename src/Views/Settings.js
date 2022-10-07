import { useState } from "react";
import { useGlobalContext } from "../context/appContext";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert";

const Settings = () => {
  const { isLoading, user, editUser, editObject, showAlert } =
    useGlobalContext();
  const [newUsername, setNewUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (newUsername === "" && firstName === "" && lastName === "") {
      return alert("You need to input something!");
    }
    editUser({ firstName, lastName, newUsername });
    setFirstName("");
    setLastName("");
    setNewUsername("");
  };

  if (isLoading && !user) {
    return <Loader />;
  }

  return (
    <div className="p-7 flex items-center justify-center md:py-14">
      <div
        className="container flex flex-col items-center"
      >
        <img
          className="mt-7 w-24 rounded-lg mb-2 self-center"
          src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png"
          alt=""
        />
        <h1 className="self-center text-xl font-bold">{`${user.username}`}</h1>
        <form onSubmit={onSubmit} className="mt-10 w-full h-full flex flex-col md:w-2/4 lg:w-2/5">
          <div className="flex flex-col">
            <label>
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="pl-4 mt-2 mb-3 h-10 w-full border outline-none rounded-md"
              minLength={4}
              maxLength={50}
            />

            <label>
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="pl-4 mt-2 mb-3 h-10 w-full border outline-none rounded-md"
              minLength={4}
              maxLength={50}
            />

            <label>
              <b>Edit username</b>
            </label>
            <input
              type="text"
              placeholder="Enter new username"
              name="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="pl-4 mt-2 mb-3 h-10 w-full border outline-none rounded-md"
              minLength={4}
              maxLength={50}
            />

            {showAlert && (
              <Alert msg={"Username already in use"} type="danger" />
            )}
            {editObject && (
              <Alert
                msg={"Username updated! You'll be logged out shortly."}
                type="success"
              />
            )}

            <button
              type="submit"
              className="mt-8 mb-4 h-10 font-bold w-full rounded-lg border-black border-2"
            >
              Edit user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
