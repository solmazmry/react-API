import { Spinner } from "reactstrap";

const CustomSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner color="primary" />
    </div>
  );
};

export default CustomSpinner;