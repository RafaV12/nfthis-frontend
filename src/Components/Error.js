const Error = ({ msg, status }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-9xl">{status}</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Something went wrong!
            </p>
            <p className="mb-8 text-center text-gray-500 text-lg">{msg}</p>
            {/* <a className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">
              Go home
            </a> */}
          </div>
          <div className="mt-4">
            <img
              src="https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg"
              alt="img"
              className="object-cover w-full h-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
