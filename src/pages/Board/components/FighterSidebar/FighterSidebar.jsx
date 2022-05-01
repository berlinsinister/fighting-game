import "./FighterSidebar.scss";

const FighterSidebar = ({
  isRtl,
  url,
  showFighter,
  name,
  health,
  attack,
  defense,
}) => {
  return (
    <>
      <img
        className={`logo ${isRtl && "is-rtl"}`}
        src={require("../../../../assets/img/logo.png")}
        alt="logo"
      />

      {showFighter && (
        <>
          <ul>
            <li className="fighter-name">{name}</li>
            <li>Health: {health}</li>
            <li>Attack: {attack}</li>
            <li>Defense: {defense}</li>
          </ul>
          <div className={`fighter ${isRtl && "is-rtl"}`}>
            <img src={url} alt="avatar" />
          </div>
        </>
      )}
    </>
  );
};

export default FighterSidebar;
