import React from "react";
import { UserContext } from "../UserContext";
import styles from "./Home.module.css";
import ButtonForm from "./Forms/ButtonForm";
import Box from "@mui/material/Box";
import TextFieldCustom from "./Forms/TextFieldCustom";

const Home = () => {
  const [keyError, setKeyError] = React.useState(null);
  const [secretError, setSecretError] = React.useState(null);

  const {
    setApiKey,
    setApiSecret,
    apiKey,
    apiSecret,
    getFuturesTrades,
    error,
    setError,
    loading,
  } = React.useContext(UserContext);

  const types = {
    secret: {
      regex: /^.{12,}$/,
    },
    key: {
      regex: /^.{6,}$/,
    },
  };
  function validate(value, type) {
    if (type === false) return true;
    if (types[type] && !types[type].regex.test(value)) {
      type === "key" ? setKeyError(true) : setSecretError(true);
      return false;
    } else {
      type === "key" ? setKeyError(null) : setSecretError(null);
      return true;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const isKeyValid = validate(apiKey, "key");
    const isSecretValid = validate(apiSecret, "secret");
    if (isKeyValid && isSecretValid) {
      getFuturesTrades(apiKey, apiSecret).then(() => {
        if (error === true && loading === false)
          console.log("deu certo me mama gostosa ");
        console.log(error);
      });
    }
  }

  return (
    <Box className={`animeLeft ${styles.formSection}`} component="form">
      <Box className={styles.boxDescContainer}>
        <Box className={styles.boxImg}>
          <img src="src\Assets\BinanceIcon.jpg"></img>
        </Box>
        <Box className={styles.boxDescText}>
          <div>Enter Binance API details</div>
          <span>*You only need to enable read-only</span>
        </Box>
      </Box>
      <TextFieldCustom
        id="apiKey"
        label="API Key"
        error={keyError}
        onChange={({ target }) => {
          setApiKey(target.value);
          if (target.value.length >= 6) setKeyError(false);
          setError(null);
        }}
        helperText={keyError ? "Length must be at least 6." : ""}
      />
      <TextFieldCustom
        id="secretKey"
        label="Secret Key"
        error={secretError}
        onChange={({ target }) => {
          setApiSecret(target.value);
          if (target.value.length >= 12) setSecretError(false);
          setError(null);
        }}
        helperText={secretError ? "Length must be at least 12." : ""}
      />
      <Box className={styles.boxButton}>
        {loading ? (
          <ButtonForm className={styles.button} disabled>
            Verifying
          </ButtonForm>
        ) : (
          <ButtonForm
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Connect
          </ButtonForm>
        )}
        {!loading && error ? (
          <p style={{ color: "#fd5a52" }}>Invalid data </p>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Home;
