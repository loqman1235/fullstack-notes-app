import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

//  errors is an array of objects

type Errors = {
  field: string;
  message: string;
}[];
const RegisterPage: React.FC = (): JSX.Element => {
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev: Inputs) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/register", inputs);
      if (res.status === 201) {
        setErrors([]);
        setInputs({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        console.error("Unexpected server response:", res);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data.errors;

        setErrors(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          errorData.map((err: any) => ({
            field: err.path,
            message: err.msg,
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);

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
          Sign Up
        </h3>

        <form onSubmit={handleRegister}>
          <div
            className="
        flex 
        flex-col
        gap-2
        mb-5
        "
          >
            <label htmlFor="username" className="text-sm font-bold ">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
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
            />
            {errors.some((error) => error.field === "username") && (
              <p className="text-red-500 text-sm">
                {errors.find((error) => error.field === "username")?.message}
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
            />
            {errors.some((error) => error.field === "email") && (
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
            />
            {errors.some((error) => error.field === "password") && (
              <p className="text-red-500 text-sm">
                {errors.find((error) => error.field === "password")?.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 mb-5">
            <p>Already have an account? </p>
            <Link className="text-cyan-600" to="/login">
              Sign In
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
          "
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
