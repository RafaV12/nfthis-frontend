import React, { useState, useEffect } from "react";

export default function Alert({ msg, type }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (msg && isMounted) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2500);
    }
    return function cleanup() {
      isMounted = false;
    };
  }, [msg]);

  return (
    <>
      {show && (
        <div
          className="p-2 absolute top-3/4 flex inline-flex bg-white items-center leading-none shadow-lg"
          role="alert"
        >
          <span
            className={
              type === "success"
                ? "flex rounded-full bg-green-500 uppercase text-white px-2 py-1 text-xs font-bold mr-3"
                : "flex rounded-full bg-red-500 uppercase text-white px-2 py-1 text-xs font-bold mr-3"
            }
          >
            {type === "success" ? "OK" : "Fail"}
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">{msg}</span>
        </div>
      )}
    </>
  );
}
