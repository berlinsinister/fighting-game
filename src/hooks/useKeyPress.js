import { useState, useEffect } from 'react';
import { controls } from '../constants/controls';

export const useKeyPress = () => {
  // implement key press logic
  // return pressed key codes

  const singleKeys = Object.values(controls).flat().slice(0, 4);
  const { playerOneCriticalHitCombination, playerTwoCriticalHitCombination } =
    controls;

  const [playerOneComboKeys, setPlayerOneComboKeys] = useState({});
  const [playerTwoComboKeys, setPlayerTwoComboKeys] = useState({});
  const [keysPressed, setKeysPressed] = useState(null);
  const [canUseCombo, setCanUseCombo] = useState(true);

  // callbacks
  const setterCallback = (key, prev, booleanValue) => ({
    ...prev,
    [key]: booleanValue,
  });

  const forEachCallback = (length, comboKeys, setterFunction) => {
    let allPressed = false;
    if (length) {
      allPressed = Object.values(comboKeys).every(
        (key) => key === false // keyup case
      );
      if (allPressed && canUseCombo) {
        setKeysPressed(Object.keys(comboKeys));
        setterFunction({});
        setCanUseCombo(false);
      }

      setTimeout(() => {
        setCanUseCombo(true);
      }, 10000);
    }
  };

  // handlers
  const handleKeyDown = (event) => {
    // single key
    if (singleKeys.includes(event.code)) {
      setKeysPressed(event.code);
    }

    // combos
    if (playerOneCriticalHitCombination.includes(event.code)) {
      setPlayerOneComboKeys((prev) => setterCallback(event.code, prev, true));
    }
    if (playerTwoCriticalHitCombination.includes(event.code)) {
      setPlayerTwoComboKeys((prev) => setterCallback(event.code, prev, true));
    }
  };

  const handleKeyUp = (event) => {
    // combos
    if (playerOneCriticalHitCombination.includes(event.code)) {
      setPlayerOneComboKeys((prev) => setterCallback(event.code, prev, false));
    }
    if (playerTwoCriticalHitCombination.includes(event.code)) {
      setPlayerTwoComboKeys((prev) => setterCallback(event.code, prev, false));
    }
  };

  // setting final combo keys
  useEffect(() => {
    const comboKeysData = [
      {
        hasRequiredLength: Object.keys(playerOneComboKeys).length === 3,
        comboKeys: playerOneComboKeys,
        function: setPlayerOneComboKeys,
      },
      {
        hasRequiredLength: Object.keys(playerTwoComboKeys).length === 3,
        comboKeys: playerTwoComboKeys,
        function: setPlayerTwoComboKeys,
      },
    ];

    comboKeysData.forEach((item) =>
      forEachCallback(item.hasRequiredLength, item.comboKeys, item.function)
    );
  }, [playerOneComboKeys, playerTwoComboKeys]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // }, [keysPressed]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return {
    keysPressed,
  };
};
