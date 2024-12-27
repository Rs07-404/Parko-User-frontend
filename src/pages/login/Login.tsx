import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/LoginHook";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { screenWidth } = useAppContext();
  const { loading, login } = useLogin();

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
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
          Login {" "}
          {screenWidth < 850 &&
            <div className="brand">
              <div>Park-</div>
              <div className="color-red">O</div>
            </div>}
        </div>
        <form onSubmit={handleSubmit} className="loginForm">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="inputForm"
              value={inputs.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="inputForm"
              value={inputs.password}
              onChange={changeHandler}
            />
          </div>
          <div>
            <button className="btn">{!loading ? "Login" : "Loading"}</button>
            {/* <div> */}
            <Link to={"/signup"} className="link">
              Don't have an account ?
            </Link>
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
