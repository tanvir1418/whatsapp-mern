import React, { useRef, useState } from "react";

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const handlePicture = (e) => {
    let picture = e.target.files[0];
    if (
      picture.type !== "image/jpeg" &&
      picture.type !== "image/png" &&
      picture.type !== "image/webp"
    ) {
      setError(`${picture.name} format is not supported.`);
      return;
    } else if (picture.size > 1024 * 1024 * 2) {
      setError(`${picture.name} is too large, maximum 2mb allowed.`);
      return;
    } else {
      setError("");
      setPicture(picture);
      // Reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = (event) => {
        setReadablePicture(event.target.result);
      };
    }
  };

  const handleChangePicture = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            src={readablePicture}
            alt="Profile Picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* change picture */}
          <div
            className="mt-2 w-20 py-2 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={() => handleChangePicture()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
