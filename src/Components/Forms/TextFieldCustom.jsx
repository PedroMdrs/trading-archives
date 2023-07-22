import TextField from "@mui/material/TextField";

const TextFieldCustom = ({ id, label, error, ...props }) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    required
    fullWidth
    margin="normal"
    error={error === true}
    {...props}
    sx={{
      "& .MuiInputBase-root.MuiOutlinedInput-root": {
        color: "#f1f1f1",
        backgroundColor: error ? "#d32f2f29" : "transparent",
      },
      "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused": {
        backgroundColor: error ? "#d32f2f29" : "#1976d237",
      },
      "& .MuiFormLabel-root.MuiInputLabel-root": {
        color: error ? "#d32f2f" : "#8c8ca1",
      },
      "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
        color: error ? "#d32f2f" : "#1976d2",
      },
      "& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
        {
          borderColor: error ? "#d32f2f" : "#676777",
        },
      "& .MuiOutlinedInput-root:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline":
        {
          borderColor: "#d48b2c",
        },
    }}
  ></TextField>
);
export default TextFieldCustom;
