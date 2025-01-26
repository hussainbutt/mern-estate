import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.errorMessage);
      }

      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  console.log(form);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-gray-800 font-semibold text-center my-7 ">
        Sign In
      </h1>
      <form className="flex flex-col " action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 mt-4"
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 mt-4"
          onChange={handleChange}
          required
        ></input>
        <button
          className="bg-slate-700 text-white uppercase my-7 p-2 rounded-lg hover:opacity-95 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2">
        <p>Don{"'"}t have an account?</p>
        <Link className="text-blue-700 hover:text-blue-900" to="/sign-up">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
