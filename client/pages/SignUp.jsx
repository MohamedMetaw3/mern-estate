import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const api = "http://localhost:3000/api";

  // handelChange function to handle change events
  const handelChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // handleSubmit-------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${api}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success === false) {
        setLoading(false);
        setError(data?.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  gap-4 "
      >
        <input
          className="border border-slate-200 w-96 p-3  rounded-lg"
          type="text"
          id="username"
          placeholder="Enter Your User Name"
          onChange={handelChange}
        />
        <input
          className="border border-slate-200 w-96 p-3 rounded-lg"
          type="email"
          id="email"
          placeholder="Enter Your User email"
          onChange={handelChange}
        />
        <input
          className="border border-slate-200 w-96 p-3 rounded-lg"
          type="password"
          id="password"
          placeholder="Enter Your User password"
          onChange={handelChange}
        />
      </form>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="font-bold text-sm sm:text-lg w-96 bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-80 disabled:opacity-70"
      >
        {loading ? "Loading...." : "Sign Up"}
      </button>
      <OAuth />
      <div className="">
        <p className="text-sm sm:text-lg w-96 text-center">
          Already have an account?
          <Link to="/sign-in" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-sm sm:text-lg w-96 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default SignUp;
