import React from "react";
import { UserContext } from "../UserContext";
import styles from "./Css/Home.module.css";
import ButtonForm from "./Forms/ButtonForm";
import TextFieldCustom from "./Forms/TextFieldCustom";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  DateRangePicker,
  Range,
  RangeKeyDict,
  defaultStaticRanges,
} from "react-date-range";
import customDates from "./customDates";

const Home = () => {
  const [keyError, setKeyError] = React.useState<null | boolean>(null);
  const [secretError, setSecretError] = React.useState<null | boolean>(null);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [endTime, setEndTime] = React.useState<number | null>(null);
  const [dateError, setDateError] = React.useState<boolean | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const Navigate = useNavigate();

  const {
    setApiKey,
    setApiSecret,
    apiKey,
    apiSecret,
    getFuturesTrades,
    error,
    setError,
    loading,
    setLoading,
  } = React.useContext(UserContext);

  const types = {
    secret: {
      regex: /^.{12,}$/,
    },
    key: {
      regex: /^.{6,}$/,
    },
  };

  function handleDateRangeChange(item: RangeKeyDict) {
    if (!item.range1.startDate || !item.range1.endDate) return;
    const startTimestamp = item.range1.startDate.getTime();
    const endTimestamp = item.range1.endDate.getTime();
    if (startTimestamp && endTimestamp) setDateError(false);
    if (
      item.range1.endDate.toDateString() ===
      item.range1.startDate.toDateString()
    ) {
      const startOfDay = new Date(item.range1.startDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(item.range1.startDate);
      endOfDay.setHours(23, 59, 59, 999);

      setStartTime(startOfDay.getTime());
      setEndTime(endOfDay.getTime());
    } else {
      setStartTime(startTimestamp);
      setEndTime(endTimestamp);
    }

    setSelectedRange(item.range1);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const isKeyValid = validate(apiKey, "key");
    const isSecretValid = validate(apiSecret, "secret");
    if (
      isKeyValid &&
      isSecretValid &&
      apiKey &&
      apiSecret &&
      startTime &&
      endTime
    ) {
      localStorage.setItem("startTime", JSON.stringify(startTime));
      localStorage.setItem("endTime", JSON.stringify(endTime));
      await getFuturesTrades(apiKey, apiSecret, startTime, endTime);
    } else {
      setDateError(true);
    }
  }

  function validate(value: string, type: "secret" | "key") {
    if (!type) return true;
    if (types[type] && !types[type].regex.test(value)) {
      type === "key" ? setKeyError(true) : setSecretError(true);
      return false;
    } else {
      type === "key" ? setKeyError(null) : setSecretError(null);
      return true;
    }
  }

  React.useEffect(() => {
    setLoading(false);
    setError(null);
  }, [setError, setLoading]);

  React.useEffect(() => {
    if (
      startTime !== null &&
      endTime !== null &&
      apiKey &&
      apiSecret &&
      error === false
    ) {
      Navigate("/trade-data");
    }
  }, [Navigate, apiSecret, apiKey, startTime, endTime, error]);

  return (
    <div className={styles.container}>
      <form className={`animeLeft ${styles.formSection}`}>
        <div className={styles.DescContainer}>
          <div className={styles.Img}>
            <img src="BinanceIcon.jpg"></img>
          </div>
          <div className={styles.DescText}>
            <div>Enter Binance API details</div>
            <span>*You only need to enable read-only</span> <br />
          </div>
        </div>
        <TextFieldCustom
          id="apiKey"
          label="API Key"
          error={keyError}
          onChange={({ target }: { target: HTMLInputElement }) => {
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
          onChange={({ target }: { target: HTMLInputElement }) => {
            setApiSecret(target.value);
            if (target.value.length >= 12) setSecretError(false);
            setError(null);
          }}
          helperText={secretError ? "Length must be at least 12." : ""}
        />
        <div className={styles.buttonContainer}>
          {loading ? (
            <ButtonForm className={styles.button} disabled>
              Verifying
            </ButtonForm>
          ) : (
            <ButtonForm
              onClick={(e: SubmitEvent) => {
                handleSubmit(e);
              }}
            >
              Connect
            </ButtonForm>
          )}
          {!loading && error ? (
            <p style={{ color: "#fd5a52" }}> Not Authorized </p>
          ) : (
            ""
          )}
          {!loading && dateError ? (
            <p style={{ color: "#fd5a52" }}> Select a date </p>
          ) : (
            ""
          )}
        </div>
      </form>
      <DateRangePicker
        months={2}
        maxDate={new Date()}
        showMonthAndYearPickers={false}
        ranges={[selectedRange]}
        onChange={handleDateRangeChange}
        inputRanges={[]}
        staticRanges={[...defaultStaticRanges, ...customDates]}
        direction="vertical"
        showDateDisplay={false}
      />
    </div>
  );
};

export default Home;
