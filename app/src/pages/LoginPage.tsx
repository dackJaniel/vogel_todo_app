import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // err
  const [errors, setErrors] = useState({ email: String });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/users/login", {
        email,
        password,
      });
      res.data && window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (e) => {
    const value = e.target.value;

    if (validator.isEmail(value)) {
      // setErrors((prevState) => delete prevState[el.name]);
    } else {
      setErrors({ email: "Muss eine E-Mail sein." });
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);

    switch (e.target.name) {
      case "email":
        validateEmail(e);
        break;

      case "password":
        break;

      default:
        break;
    }
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="w-1/3 max-w-lg min-w-[290px] my-28 mx-auto">
        <h1 className=" text-4xl text-slate-700 mb-3">Login</h1>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-slate-600 text-sm">
              Benutzername/ E-Mail-Adresse
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Benutzername/ E-Mail eingeben"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              onChange={handleChangeEmail}
            />
          </div>
          <div>{errors.email}</div>
          <div>
            <label htmlFor="password" className="text-slate-600 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Passwort eingeben"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              onChange={handleChangePass}
            />
          </div>
          <button className="mt-3 w-full p-2 bg-indigo-600 hover:bg-indigo-500 transition-all transi rounded-lg hover:rounded-full text-slate-50">
            Login
          </button>
        </form>
        <div className="flex gap-2">
          <Link
            to="/register"
            className="text-sm text-slate-600 hover:underline hover:text-slate-800 transition"
          >
            Registrieren
          </Link>
          <Link
            to="#"
            className="text-sm text-slate-600 hover:underline hover:text-slate-800 transition"
          >
            Passwort vergessen
          </Link>
        </div>
      </div>
    </>
  );
}
