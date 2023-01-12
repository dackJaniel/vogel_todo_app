import axios from "axios";
import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
// import { v4 as uid } from 'uuid';
import validator from "validator";

const RegisterPage = (props) => {
  const uid = useId();

  // const {} = props;
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({ username: false });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Eventhandler ====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const formData = getFormData(e.target);

    console.log(formData);

    // try {
    //   const res = await axios.post('/auth/register', {
    //     username,
    //     email,
    //     password,
    //     passwordConfirm,
    //   });
    //   res.data && window.location.replace('/login');
    // } catch (error) {
    //   setError(true);
    //   console.error(error);
    // }
  };

  // const handleChange = (e) => {
  //   if (e.target.type === 'email') setEmail(e.target.value);
  // }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleBlur = (e) => {
    const el = e.currentTarget;
    console.log(el.name);
    switch (el.name) {
      case "username":
        validateTextField(el);
        break;

      case "firstName":
        validateTextField(el, { min: 2, max: 100 });
        break;
      case "email":
        validateEmailField(el);
        break;
    }
  };

  // Function =========
  const validateEmailField = (el) => {
    const value = el.value;
    if (!validator.isEmail(value)) {
      setErrors({ [el.name]: `Your Email is not valid` });
    } else {
      setErrors((prevState) => delete prevState[el.name]);
    }
  };

  const validateTextField = (el, opts = { min: 2, max: 40 }) => {
    const value = el.value;
    const { min, max } = opts;
    if (validator.isEmpty(value) || !validator.isLength(value, opts)) {
      //el.classList.add('is-valid')
      setErrors({
        [el.name]: `Field is to short or to long (${min} | ${max})`,
      });
    } else {
      setErrors((prevState) => delete prevState[el.name]);
    }
  };

  const getFormData = (form, requiredFields = []) => {
    const formData = new FormData(form);

    // z.B. new FormData(form).entries()

    // [
    //  {},
    //    ['firstname', 'Max'],
    //    ['lastname', 'Mustermann']
    //  ...
    // ]

    //  {'firstname': 'Max', 'lastname:'Mustermann'}

    const formObj = Array.from(formData.entries()).reduce((obj, arr) => {
      if (requiredFields.length > 0) {
        if (!obj[arr[0]] && requiredFields.includes(arr[0])) {
          obj[arr[0]] = arr[1];
        }
      } else {
        if (!obj[arr[0]]) {
          obj[arr[0]] = arr[1];
        }
      }
      return obj;
    }, {});

    return formObj;
  };

  return (
    <div className="container">
      {JSON.stringify(errors)}
      <h1>Register</h1>

      <form className="form-register" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className={`form-control input-username ${
                  errors?.username ? "is-invalid" : "is-valid"
                }`}
                placeholder="Enter your username"
                onChange={handleChangeUsername}
                onBlur={handleBlur}
              />
              <div className="valid-feedback">Alles ok</div>
              <div className="invalid-feedback">{errors?.username}</div>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor={`email-${uid}`} className="form-label">
                Email
              </label>
              <input
                id={`email-${uid}`}
                type="text"
                name="email"
                className={`form-control input-email ${
                  errors?.email ? "is-invalid" : "is-valid"
                }`}
                placeholder="Enter your email"
                onChange={handleChangeEmail}
                onBlur={handleBlur}
              />
              <div className="valid-feedback">Alles ok</div>
              <div className="invalid-feedback">{errors?.email}</div>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor={`password-${uid}`} className="form-label">
                Password
              </label>
              <input
                id={`password-${uid}`}
                type="password"
                className="form-control input-password"
                placeholder="Enter your password"
                onChange={handleChangePassword}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor={`password-confirm-${uid}`} className="form-label">
                confirm Password
              </label>
              <input
                id={`password-confirm-${uid}`}
                type="password"
                className="form-control input-password"
                placeholder="Enter your password"
                onChange={handleChangePasswordConfirm}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="btn btn-dark button-register">
            Register
          </button>
          <p>
            Already registered?{" "}
            <Link className="link-registered my-3 d-inline-block" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>

      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong
        </span>
      )}
    </div>
  );
};

export default RegisterPage;
