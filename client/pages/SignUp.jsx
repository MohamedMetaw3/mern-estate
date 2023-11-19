import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="flex flex-col items-center p-4 gap-4 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col items-center  gap-4 ">
        <input
          className="border border-slate-200 w-96 p-3  rounded-lg"
          type="text"
          id="username"
          placeholder="Enter Your User Name"
        />
        <input
          className="border border-slate-200 w-96 p-3 rounded-lg"
          type="email"
          id="email"
          placeholder="Enter Your User email"
        />
        <input
          className="border border-slate-200 w-96 p-3 rounded-lg"
          type="password"
          id="password"
          placeholder="Enter Your User password"
        />
      </form>
      <button className="font-bold text-sm sm:text-lg w-96 bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">
        Sign Up
      </button>
      <div className="">
        <p className="text-sm sm:text-lg w-96 text-center">
          Already have an account?
          <Link to="/sign-in" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default SignUp;
