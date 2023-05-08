import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ user }) {
  const [log, setlog] = useState("");
  let navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4800/login", { log })
      .then((response) => {
        // console.log("response", response.data.data);
        localStorage.setItem("user", response.data.data[0].id);
         localStorage.setItem("userdata", response.data.data[0].role);

        // localStorage.getItem("user");

        if (Object.keys(response.data).length > 0) {
          localStorage.setItem("token", response.data.token);
          if (localStorage.getItem("token").length > 0) {
            navigate("/home");
          }
        }
      });
  };

  return (
    <div>
      <section className="loginsection">
        <div className="container py-5 h-100">
          <div
            className="loginrow
             d-flex"
          >
            <div className="col col-xl-10">
              <div className="logincard">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      id="imagee"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">Login Here</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" id="loginh5">
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            value={log.email}
                            onChange={(e) =>
                              setlog({ ...log, email: e.target.value })
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            value={log.password}
                            onChange={(e) =>
                              setlog({ ...log, password: e.target.value })
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            onClick={login}
                          >
                            Login
                          </button>
                        </div>

                        <a className="small" id="loginat1">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" id="loginpt">
                          Don't have an account?{" "}
                          <Link to={"/signup"}>
                            {" "}
                            <a className="loginat">Register here</a>
                          </Link>
                        </p>
                        <a className="small" id="loginat1">
                          Terms of use.
                        </a>
                        <a className="small" id="loginat1">
                          Privacy policy
                        </a>
                      </form>
                    </div>
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
