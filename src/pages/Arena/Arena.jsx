import { HealthBar, Modal } from '../../components';
import './Arena.scss';
import { useFight } from './hooks';

const Arena = () => {
  const { fighterOneDetails, fighterTwoDetails, winner } = useFight();

  return (
    <div className="arena">
      <Modal isShow={!!winner} name={winner?.name} url={winner?.avatar} />
      <div className="health-row">
        <HealthBar
          name={fighterOneDetails?.name}
          health={fighterOneDetails?.health}
          initial={fighterOneDetails?.initialHealth}
        />
        <HealthBar
          name={fighterTwoDetails?.name}
          health={fighterTwoDetails?.health}
          initial={fighterTwoDetails?.initialHealth}
          isRTL
        />
      </div>
      <div className="fighters-wrapper">
        <div className="col">
          <img src={fighterOneDetails?.source} alt="fighter-left" />
        </div>

        <div className="col is-rtl">
          <img src={fighterTwoDetails?.source} alt="fighter-right" />
        </div>
      </div>
    </div>
  );
};

export default Arena;
