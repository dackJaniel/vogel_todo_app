import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  // err
  const [errors, setErrors] = useState({
    email: ["", false],
    pass: ["", false],
    passAgain: ["", false],
    form: "",
  });

  console.log(errors.email);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (errors.email[1] === false || errors.pass[1] === false) {
      setErrors({ ...errors, form: "Bitte prüfe die Felder" });
      return;
    }
    setErrors({ ...errors, form: "" });

    try {
      const res = await axios.post("http://localhost:8080/api/v1/users/login", {
        email,
        password,
      });
      console.log(res.data);
      res.data && window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = (e: any) => {
    const email = validator.trim(e.target.value);
    setEmail(email);

    if (!validator.isEmail(email)) {
      setErrors({ ...errors, email: ["ist keine Email", false] });
    } else {
      setErrors({ ...errors, email: ["", true] });
    }
  };

  const handleChangePass = (e: any) => {
    const pass = e.target.value;

    if (!validator.isStrongPassword(pass)) {
      setErrors({ ...errors, pass: ["ist kein Passwort", false] });
    } else {
      setPassword(pass);
      setErrors({ ...errors, pass: ["Alles OK", true] });
    }
  };

  const handleChangePassAgain = (e: any) => {
    const passAgain = e.target.value;

    // https://www.npmjs.com/package/validator
    if (!validator.equals(passAgain, password)) {
      setErrors({ ...errors, passAgain: ["Passwort nicht gleich", false] });
    } else {
      setPasswordAgain(passAgain);
      setErrors({ ...errors, passAgain: ["Alles OK", false] });
    }
  };

  return (
    <>
      <div className="w-1/3 max-w-lg min-w-[290px] my-28 mx-auto">
        <h1 className=" text-4xl text-slate-700 mb-3">Login</h1>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-slate-600 text-sm">
              E-Mail-Adresse
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
          <div className={``}>{errors.email[0]}</div>
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
            <div>{errors.pass[0]}</div>
          </div>

          <div>
            <label htmlFor="password" className="text-slate-600 text-sm">
              Password Nochmal
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Passwort eingeben"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              onChange={handleChangePassAgain}
            />
            <div>{errors.passAgain[0]}</div>
          </div>

          <button className="mt-3 w-full p-2 bg-indigo-600 hover:bg-indigo-500 transition-all transi rounded-lg hover:rounded-full text-slate-50">
            Login
          </button>
          <div>{errors.form}</div>
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
