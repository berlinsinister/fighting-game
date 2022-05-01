import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img src={require("../../assets/img/loading.gif")} alt="loading" />
    </div>
  );
};

export default Loader;
