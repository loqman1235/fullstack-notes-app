import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { loginThunk } from "../features/thunks/authThunk";
import { MoonLoader } from "react-spinners";

type Inputs = {
  email: string;
  password: string;
};

type Errors = {
  field: string;
  message: string;
};
interface ErrorResponse {
  path: string;
  msg: string;
}

const LoginPage = () => {
  const { status } = useSelector<RootState, RootState["auth"]>(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    password: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<Errors[]>([]);
  const [credsError, setCredsError] = useState<string>("");
  const navigate = useNavigate();

  // const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const res = await dispatch(loginThunk(inputs));

      if (loginThunk.fulfilled.match(res)) {
        setCredsError("");
        navigate("/");
      } else {
        if (Array.isArray(res.payload)) {
          // If payload is an array of errors
          setCredsError("");
          setErrors(
            res.payload.map((err: ErrorResponse) => ({
              field: err.path,
              message: err.msg,
            }))
          );
        } else if (typeof res.payload === "string") {
          // If payload is a string error message
          setErrors([]);
          setCredsError(res.payload);
        } else {
          // Handle other unexpected payload types
          console.error(
            "Unexpected payload type:",
            typeof res.payload,
            res.payload
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  return (
    <div
      className="
  w-full 
  min-h-screen 
  flex 
  items-center
  justify-center
  p-5 
  "
    >
      <div
        className="
      max-w-lg
      w-full
      rounded-md
      p-5
      bg-white
      shadow
      "
      >
        <h3 className="text-2xl md:text-3xl font-extrabold capitalize mb-8 ">
          Sign In
        </h3>
        <form onSubmit={handleLogin}>
          <div
            className="
            flex 
            flex-col
            gap-2
            mb-5
        "
          >
            <label htmlFor="email" className="text-sm font-bold ">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="
              p-3
              outline-none
              bg-transparent
              placeholder:text-primary-200
              text-lg
              border
              border-primary-100
              focus:border-cyan-600
              focus:border-2
              rounded-lg
              "
              autoComplete="off"
              onChange={handleChange}
              value={inputs.email}
              ref={inputRef}
            />
            {errors.some((err) => err.field === "email") && (
              <p className="text-red-500 text-sm">
                {errors.find((error) => error.field === "email")?.message}
              </p>
            )}
          </div>

          <div
            className="
            flex 
            flex-col
            gap-2
            mb-5
        "
          >
            <label htmlFor="password" className="text-sm font-bold ">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="
              p-3
              outline-none
              bg-transparent
              placeholder:text-primary-200
              text-lg
              border
              border-primary-100
              focus:border-cyan-600
              focus:border-2
              rounded-lg

              "
              autoComplete="off"
              onChange={handleChange}
              value={inputs.password}
            />
            {errors.some((err) => err.field === "password") && (
              <p className="text-red-500 text-sm">
                {errors.find((error) => error.field === "password")?.message}
              </p>
            )}

            {credsError && <p className="text-red-500 text-sm">{credsError}</p>}
          </div>

          <div className="flex items-center gap-1 mb-5">
            <p>Don't have an account? </p>
            <Link className="text-cyan-600" to="/register">
              Sign Up
            </Link>
          </div>
          <button
            className="
          w-full 
          rounded-md
          bg-cyan-600
          text-white 
          flex 
          items-center
          justify-center
          py-4
          font-bold
          capitalize
          text-lg
          hover:bg-cyan-700
          transition
          duration-300
          disabled:opacity-50
          disabled:cursor-not-allowed
          gap-2

          "
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <MoonLoader
                  color="white"
                  size={20}
                  loading={status === "loading"}
                  aria-label="Loading Spinner"
                />
                <p>Loading...</p>
              </>
            ) : (
              " Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
