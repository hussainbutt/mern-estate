import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-gray-800 font-semibold text-center my-7 ">
        Sign Up
      </h1>
      <form className="flex flex-col " action="">
        <input
          placeholder="username"
          id="username"
          className="border rounded-lg p-3"
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 mt-4"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 mt-4"
        ></input>
        <button
          className="bg-slate-700 text-white uppercase my-7 p-2 rounded-lg hover:opacity-95 disabled:opacity-60"
          type="submit"
        >
          Sign up
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link className="text-blue-700 hover:text-blue-900">Sign In</Link>
      </div>
    </div>
  );
}
