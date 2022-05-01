import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Board.scss';
import { useBoard } from './hook/useBoard';
import FighterSidebar from './components/FighterSidebar/FighterSidebar';
import { Loader } from '../../components';

const Board = () => {
  const { isLoading, fighters, getFighterInfo, fighter } = useBoard();
  const [selectedFightersData, setFightersData] = useState({
    playerOne: {},
    playerTwo: {},
  });
  const [player, setSelectedPlayer] = useState();
  const [selectedFightersQty, setSelectedFightersQty] = useState(0);

  const { playerOne, playerTwo } = selectedFightersData;

  const handleClick = (id, player) => {
    getFighterInfo(id);
    setSelectedPlayer(player);
    setSelectedFightersQty(selectedFightersQty + 1);
  };

  // TODO add logic for setting selectedFightersData
  // need for showing selected fighters with their details
  useEffect(() => {
    if (fighter?.id) {
      setFightersData((prev) => ({
        ...prev,
        [player]: fighter,
      }));
    }
  }, [fighter?.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="fighter-col">
            <FighterSidebar
              showFighter={!!Object.keys(playerOne).length}
              url={playerOne.avatar}
              name={playerOne.name}
              health={playerOne.health}
              attack={playerOne.attack}
              defense={playerOne.defense}
            />
          </div>

          <div>
            <h2 className="title">CHOOSE YOUR FIGHTER</h2>
            <div className="board-wrapper">
              {fighters.map(({ avatar, id }) => (
                <div key={id} className="avatar-wrapper">
                  {selectedFightersQty ? (
                    <button
                      className="avatar avatar-2"
                      onClick={() => handleClick(id, 'playerTwo')}
                      disabled={selectedFightersQty > 1}
                      style={{ background: `#f2f3f5 url(${avatar}) no-repeat` }}
                    ></button>
                  ) : (
                    <button
                      className="avatar avatar-1"
                      onClick={() => handleClick(id, 'playerOne')}
                      style={{ background: `#f2f3f5 url(${avatar}) no-repeat` }}
                    ></button>
                  )}
                </div>
              ))}
            </div>

            <div className="btn-wrapper">
              {!!Object.keys(playerTwo).length && (
                <Link
                  className="btn-start"
                  to={{
                    pathname: '/arena',
                    search: `?playerOne=${playerOne.id}&playerTwo=${playerTwo.id}`,
                  }}
                >
                  FIGHT
                </Link>
              )}
            </div>
          </div>

          <div className="fighter-col">
            <FighterSidebar
              isRtl
              showFighter={!!Object.keys(playerTwo).length}
              url={playerTwo.avatar}
              name={playerTwo.name}
              health={playerTwo.health}
              attack={playerTwo.attack}
              defense={playerTwo.defense}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
