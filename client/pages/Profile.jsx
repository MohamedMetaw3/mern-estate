import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state?.user);
  return (
    <div>
      <h1 className=" text-center my-7 font-bold text-3xl">Profile</h1>

      <form className="flex flex-col items-center  mx-auto py-7 gap-4">
        <img
          className="rounded-full cursor-poiner w-24 h-24 object-cover "
          src={currentUser?.avatar}
          alt="profile image"
        />
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
