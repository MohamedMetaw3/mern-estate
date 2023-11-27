/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  updateUserError,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserError,
  deleteUserSuccess,
} from "../src/redux/user/userSlice";
import { app } from "../src/firebase";

// Main Function -------->
const Profile = () => {
  const currentUser = useSelector((state) => state?.user);
  const error = useSelector((state) => state?.user);
  const loading = useSelector((state) => state?.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();

  // clg---->
  console.log(formData);
  console.log(filePerc);
  console.log(file);

  useEffect(() => {
    if (file) {
      setFile(file);
      () => handleFileUpload(file);
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
  // Handel Change function
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // handleSubmit-------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success === false) {
        dispatch(updateUserError(data?.message));

        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserError(error.message));
    }
  };
// handle Delete user function---------->
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete${currentUser?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data?.success === false) {
        dispatch(deleteUserError(data?.message));

        return;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserError(error?.message));
    }
  };
  return (
    <div>
      <h1 className=" text-center my-7 font-bold text-3xl">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  mx-auto py-7 gap-4"
      >
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
          defaultValue={currentUser?.username}
          onChange={() => handleChange}
        />
        <input
          id="emai"
          className="w-96 p-3 rounded-lg  "
          type="email"
          placeholder="your Email"
          defaultValue={currentUser?.email}
          onChange={() => handleChange}
        />
        <input
          id="password"
          className="w-96 p-3 rounded-lg  "
          type="password"
          placeholder="your password"
          defaultValue={currentUser?.password}
          onChange={() => handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-700 uppercase w-96 hover:opacity-70 text-white rounded-lg p-3"
        >
          {loading ? "Loading...." : "Update"}
        </button>
        <button className="bg-green-700 uppercase w-96 hover:opacity-70 text-white rounded-lg p-3">
          create listing
        </button>
      </form>
      <div className="flex justify-between mx-2 ">
        <span onClick={handleDeleteUser} className="font-bold cursor-pointer text-red-500 text-lg uppercase">
        Delete  account
        </span>
        <span className="font-bold cursor-pointer text-red-500 text-lg uppercase">
          sign out
        </span>
      </div>
      {error && (
        <p className="text-red-500 text-sm sm:text-lg w-96 text-center">
          {error}
        </p>
      )}
      {updateSuccess && (
        <p className="text-green-500 text-sm sm:text-lg w-96 text-center">
          success
        </p>
      )}
    </div>
  );
};

export default Profile;
