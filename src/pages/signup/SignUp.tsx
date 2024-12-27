import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/SignUpHook";
import { useAppContext } from "../../context/AppContext";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { screenWidth } = useAppContext();

  const { loading, signUp } = useSignUp();

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(inputs);
  };

  return (
    <div className="canvas">
      {screenWidth > 850 && <div className="headText">
        <div className="brand">
          <div>Park-</div> <div className="color-red">O</div>
        </div>
      </div>}
      <div className="loginBox">
        <div className="headText">
          Sign Up {" "}
          {screenWidth < 850 &&
            <div className="brand">
              <div>Park-</div>
              <div className="color-red">O</div>
            </div>}
        </div>
        <form className="signupForm" onSubmit={handleSubmit}>
          <div>
            <label className="label">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter Full Name"
              className="inputForm"
              value={inputs.fullName}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              value={inputs.gender}
              className="inputForm"
              onChange={changeHandler}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Username"
              className="inputForm"
              value={inputs.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter Username"
              className="inputForm"
              value={inputs.phone}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="inputForm"
              value={inputs.password}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Enter Same Password"
              className="inputForm"
              value={inputs.confirmPassword}
              onChange={changeHandler}
            />
          </div>
          <div>
            <button className="btn">
              {loading ? "loading..." : "Sign Up"}
            </button>
            <div>
              <Link to={"/login"} className="link">
                Already have an account ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
