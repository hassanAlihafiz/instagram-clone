import React, { useContext, useState } from "react";
import { ContextProvider } from "../Global/Context";
const Model = () => {
  const { model, closeModel, registerUser, loginUser } = useContext(
    ContextProvider
  );
  //use this state to login and register
  const [state, setState] = useState({
    register: true,
    login: false,
  });
  // Switch Between Login And Register
  const toggle_forms = () => {
    setState({
      ...state,
      register: !state.register,
      login: !state.login,
    });
  };

  //Close Model
  const close_Model = (e) => {
    const c = e.target.getAttribute("class");
    if (c === "model") {
      closeModel();
    }
  };

  //inputs state
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handle_inputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const register_users = (e) => {
    e.preventDefault();
    registerUser(inputs);
    setInputs({ username: "", email: "", password: "" });
  };
  const login_user = (e) => {
    e.preventDefault();
    loginUser(inputs);
    setInputs({ username: "", email: "", password: "" });
  };
  return (
    <>
      {model ? (
        <div className="model" onClick={close_Model}>
          <div className="model__container">
            {state.register ? (
              <div className="model__form">
                <form onSubmit={register_users}>
                  <div className="model__group">
                    <img src={require("../images/instagramLogo.png")} alt="" />
                  </div>
                  <div className="model__group">
                    <input
                      className="model__input"
                      type="text"
                      name="username"
                      className="model__input"
                      placeholder="Enter  Username"
                      onChange={handle_inputs}
                      value={inputs.username}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="text"
                      name="email"
                      className="model__input"
                      placeholder="Enter Email"
                      onChange={handle_inputs}
                      value={inputs.email}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="password"
                      name="password"
                      className="model__input"
                      placeholder="Enter Password"
                      onChange={handle_inputs}
                      value={inputs.password}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-smart"
                    />
                  </div>
                  <div className="model__group">
                    <span onClick={toggle_forms}>Have an account? Sign In</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="model__form">
                <form onSubmit={login_user}>
                  <div className="model__group">
                    <img src={require("../images/instagramLogo.png")} alt="" />
                  </div>

                  <div className="model__group">
                    <input
                      type="text"
                      name="email"
                      className="model__input"
                      placeholder="Enter Email"
                      onChange={handle_inputs}
                      value={inputs.email}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="password"
                      name="password"
                      className="model__input"
                      placeholder="Enter Password"
                      onChange={handle_inputs}
                      value={inputs.password}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-smart"
                    />
                  </div>
                  <div className="model__group">
                    <span onClick={toggle_forms}>
                      Create a new Account? SignUp
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Model;
