import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signp() {
  const navigate = useNavigate();

  const validEmail = new RegExp(/\S+@\S+\.\S+/);
  const validPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/
  );

  const [user, setuser] = useState({
    Name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [adding, setAdding] = useState(true);
  const [addError, setaddError] = useState({});
  const [error, setError] = useState({
    Name: "",
    email: "",
    password: "",
    repassword: "",
  });
  let handleChange = (e) => {
    console.log(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
    isValidData(e);
  };

  const isValidData = (e) => {
    setError((user) => {
      const stateObj = { ...user, [e.target.name]: "" };
      console.log("stateObj", stateObj);

      switch (e.target.name) {
        case "fullName":
          if (!e.target.value) {
            stateObj[e.target.name] = "Please enter Name.";
          } else {
            stateObj[e.target.name] = "";
          }
          break;

        case "email":
          if (!e.target.value) {
            stateObj[e.target.name] = "Please enter a valid email address.";
          } else if (!validEmail.test(e.target.value)) {
            stateObj[e.target.name] = "Please enter valid email address.";
          } else {
            stateObj[e.target.name] = "";
          }
          break;

        case "password":
          if (!e.target.value) {
            stateObj[e.target.name] = "Please enter a password.";
          } else if (!validPassword.test(e.target.value)) {
            stateObj[e.target.name] =
              "Password should contain atleast uppercase, lowercase, special character,number and limit 8-20 must be required..";
          } else if (user.repassword && e.target.value !== user.repassword) {
            stateObj["repassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj[e.target.name] = "";
          }

          break;

        case "repassword":
          if (!e.target.value) {
            stateObj[e.target.name] = "Please enter Confirm Password.";
          } else if (user.password && e.target.value !== user.password) {
            stateObj[e.target.name] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj[e.target.name] = "";
          }

          break;

        default:
          break;
      }
      var a = stateObj;
      setaddError(a);
      if (
        addError.fullName === "" ||
        addError.email === "" ||
        addError.password === "" ||
        addError.repassword === ""
      ) {
        setAdding(false);
      }
      return stateObj;
    });
    console.log("error", error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      error.Name.length > 0 ||
      error.email.length > 0 ||
      error.password.length > 0 ||
      error.repassword.length > 0
    ) {
      console.log("error should be here");
      alert("error should be here");
    } else {
      axios
        .post("http://localhost:4800/signup", { user })
        .then(function (response) {
          console.log("respomnsedsdf", response.data);
          //  const { userName } = response.data.Name;
          // localStorage.setItem("user", JSON.stringify(userName));
          // const { token } = response.data;
          // localStorage.setItem("token", token);
          navigate("/");
          alert(
            "Thanks for signing up, please check your email to verify your account and complete registration"
          );
        })

        .catch((err) => {
          console.log("ERROR---", err);
          if (err.message) {
            alert(err.message);
          }
        });
    }
  };

  return (
    <div>
      <section className=" bg-image" id="signsection">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="signcard">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
                    <form className="fo" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          name="Name"
                          type="text"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={user.Name}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Name
                        </label>
                      </div>
                      {error.Name && <span className="err">{error.Name}</span>}

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="email"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={user.email}
                        />

                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>
                      {error.email && (
                        <span className="err">{error.email}</span>
                      )}

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          name="password"
                          value={user.password}
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>
                      {error.password && (
                        <span className="err">{error.password}</span>
                      )}

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          name="repassword"
                          value={user.repassword}
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Repeat your password
                        </label>
                      </div>
                      {error.repassword && (
                        <span className="err">{error.repassword}</span>
                      )}

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          id="sign"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to={"/"}>
                          <a className="fw-bold text-body">
                            <u>Login here</u>
                          </a>
                        </Link>
                        <br></br>
                        <u>Forgot Password</u>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
