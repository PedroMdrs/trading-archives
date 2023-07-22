import Button from "@mui/material/Button";

const ButtonForm = (props) => (
  <Button
    {...props}
    size="medium"
    variant="contained"
    sx={{
      fontFamily: "Manrope, serif",
      fontSize: "0.8rem",
      textTransform: "initial",
      padding: "0.3rem 1rem",
      backgroundColor: "rgb(85, 85, 92) !important",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: "#1976d2 !important",
      },
    }}
  >
    {props.children}
  </Button>
);
export default ButtonForm;
