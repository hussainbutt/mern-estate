import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.errorMessage);
      }
      console.log("going to login page");

      navigate("/sign-in");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(form);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-gray-800 font-semibold text-center my-7 ">
        Sign Up
      </h1>
      <form className="flex flex-col " action="" onSubmit={handleSubmit}>
        <input
          placeholder="username"
          id="userName"
          className="border rounded-lg p-3"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 mt-4"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 mt-4"
          onChange={handleChange}
        ></input>
        <button
          className="bg-slate-700 text-white uppercase my-7 p-2 rounded-lg hover:opacity-95 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link className="text-blue-700 hover:text-blue-900">Sign In</Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
