import { useGlobalContext } from "../context/appContext";
import NftForm from "../Components/NftForm";

const Create = () => {
  const { showAlert } = useGlobalContext();

  return (
    <div className="p-7 min-h-screen flex flex-col items-center">
      {showAlert && (
        <div className="-mt-5 absolute top-2/4 text-lg font-bold">
          There was an error, please try again.
        </div>
      )}
      <NftForm />
    </div>
  );
};

export default Create;
