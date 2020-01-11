import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const authContext = useContext(AuthContext);
  const alertsContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  const { email, password } = user;

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) props.history.push("/");
    if (error) {
      alertsContext.setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="form-container">
      <h1>Login User</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          ></input>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
