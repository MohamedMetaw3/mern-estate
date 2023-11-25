/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../src/firebase";

const Profile = () => {
  const currentUser = useSelector((state) => state?.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  console.log(formData);

  console.log(filePerc);
  console.log(file);

  useEffect(() => {


    if (file) {
     
      setFile(file);
      ()=> handleFileUpload(file);
    }
  }, [file]);

  // handel upload image file----->
  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const refStorage = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(file, refStorage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div>
      <h1 className=" text-center my-7 font-bold text-3xl">Profile</h1>

      <form className="flex flex-col items-center  mx-auto py-7 gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef?.current?.click()}
          className="rounded-full cursor-poiner w-24 h-24 object-cover "
          src={formData?.avatar || currentUser?.avatar}
          alt="profile image"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          id="username"
          className="w-96 p-3 rounded-lg  "
          type="username"
          placeholder="your username"
        />
        <input
          id="emai"
          className="w-96 p-3 rounded-lg  "
          type="email"
          placeholder="your Email"
        />
        <input
          id="password"
          className="w-96 p-3 rounded-lg  "
          type="password"
          placeholder="your password"
        />
        <button className="bg-blue-700 uppercase w-96 hover:opacity-70 text-white rounded-lg p-3">
          update
        </button>
        <button className="bg-green-700 uppercase w-96 hover:opacity-70 text-white rounded-lg p-3">
          create listing
        </button>
      </form>
      <div className="flex justify-between mx-2 ">
        <span className="font-bold cursor-pointer text-red-500 text-lg uppercase">
          account
        </span>
        <span className="font-bold cursor-pointer text-red-500 text-lg uppercase">
          sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
