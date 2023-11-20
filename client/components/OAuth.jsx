import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../src/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../src/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGooleClick = async () => {
    const api = "http://localhost:3000/api";
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      //   send data to server
      const res = await fetch(`${api}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: result.user.id,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          email: result.user.email,
         
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("couldn't connect to Google ", error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGooleClick}
        className="bg-red-700 w-96 p-3 rounded-lg text-white font-bold text-xl uppercase hover:opacity-80"
      >
        continue with Google
      </button>
    </div>
  );
};

export default OAuth;
