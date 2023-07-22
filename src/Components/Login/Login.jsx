import React from "react";
import TextFieldCustom from "../Forms/TextFieldCustom";
import ButtonForm from "../Forms/ButtonForm";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <form className={`animeLeft ${styles.formContainer}`}>
      <div>
        <div className={styles.desc}>Login to your account to continue</div>

        <TextFieldCustom
          id="Username/Email"
          label="Username or Email"
        ></TextFieldCustom>

        <TextFieldCustom label="Password" id="password"></TextFieldCustom>

        <div className={styles.buttonContainer}>
          <ButtonForm className={styles.button}>Login</ButtonForm>
        </div>
      </div>
      <div className={styles.linkContainer}>
        <div>
          <p>Forgot Password? </p>
          <Link className={styles.link}> Reset Password</Link>
        </div>
        <div>
          <p>Don&#39;t have an account? </p>
          <Link className={styles.link}> Sign up here</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
