import { useEffect } from "react";
import { useGlobalContext } from "../context/appContext";

const DeleteModal = ({ activeObject, closeModal, showModal }) => {
  const { deleteNft, showAlert, nft } = useGlobalContext();
  // Disable scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <div className="absolute top-0 w-full h-full bg-black bg-opacity-20 z-40">
      <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-24 z-50 justify-center items-center md:inset-0 h-modal sm:h-full">
        <div className="relative px-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg
                className="mx-auto mb-4 w-14 h-14 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete '{activeObject.title}'?
              </h3>
              <img
                src={activeObject.image}
                className="mb-5 rounded-md"
                alt={activeObject.title}
              />
              <button
                onClick={() => {
                  deleteNft(activeObject._id);
                  setTimeout(() => {
                    closeModal();
                  }, 2000);
                }}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeModal}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              >
                No, cancel
              </button>
              {showAlert && (
                <p className="mt-5 text-red-500">
                  NFT ID not found! Try again.
                </p>
              )}
              {nft !== null && (
                <p className="mt-5 text-green-500">NFT deleted successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
