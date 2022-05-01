import './HealthBar.scss';

const HealthBar = ({ initial, health, name, isRTL }) => {
  return (
    <div className="bar-wrapper" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <p className="name">{name}</p>
      <div
        className="bar"
        style={{ width: `${(health * 100) / initial}%` }}
        // style={{ width: `${health}%` }}
      ></div>
    </div>
  );
};

export default HealthBar;
