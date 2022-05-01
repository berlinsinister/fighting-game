import { useState, useEffect } from 'react';
import { controls } from '../../../constants/controls';
import { useKeyPress } from '../../../hooks/useKeyPress';
import { useArena } from './useArena';

export const useFight = () => {
  const { selectedPair } = useArena();
  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  // implement fight logic, return fighters details and winner details
  const [fighterOneDetails, setFighterOneDetails] = useState({});
  const [fighterTwoDetails, setFighterTwoDetails] = useState({});
  const [winner, setWinner] = useState(null);
  const [finalKeys, setfinalKeys] = useState([]);

  const getDamage = (attacker, defender) => {
    // return damage
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    let damage = hitPower - blockPower;
    damage = damage < 0 ? 0 : damage;
    return damage;
  };

  const getHitPower = (fighter) => {
    // return hit power
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    const stronger = finalKeys.length === 3 ? 2 : 1;
    const power = stronger * fighter.attack * criticalHitChance;
    return power;
  };

  const getBlockPower = (fighter) => {
    // return block power
    const dodgeChance = Math.floor(Math.random() * 2) + 1;
    const power = fighter.defense * dodgeChance;
    return power;
  };

  // callbacks
  const updateHealthCallback = (prev, damage) => ({
    ...prev,
    health: prev.health - damage >= 0 ? prev.health - damage : 0,
  });

  // functions
  const updateHealth = (keys) => {
    let attacker, defender;

    // 2 hits, non block case
    if (keys.length === 2 && !isBlockCase(keys)) {
      setFighterOneDetails((prev) =>
        updateHealthCallback(
          prev,
          getDamage(fighterOneDetails, fighterTwoDetails)
        )
      );

      setFighterTwoDetails((prev) =>
        updateHealthCallback(
          prev,
          getDamage(fighterTwoDetails, fighterOneDetails)
        )
      );
    }

    if (keys.length === 3) {
      let firstKey = keys[0];
      attacker =
        firstKey === 'KeyQ'
          ? fighterOneDetails
          : firstKey === 'KeyU'
          ? fighterTwoDetails
          : null;

      defender =
        attacker?.id === fighterOneDetails.id
          ? fighterTwoDetails
          : fighterOneDetails;

      if (defender.id === fighterOneDetails.id) {
        setFighterOneDetails((prev) =>
          updateHealthCallback(prev, getDamage(attacker, defender))
        );
      } else {
        setFighterTwoDetails((prev) =>
          updateHealthCallback(prev, getDamage(attacker, defender))
        );
      }
    }
  };

  const defineWinner = (fighterOneHealth, fighterTwoHealth) => {
    const winnerFighter =
      fighterOneHealth === 0
        ? fighterTwoDetails
        : fighterTwoHealth === 0
        ? fighterOneDetails
        : null;

    if (winnerFighter) {
      setWinner(winnerFighter);
    }
  };

  const isBlockCase = (keys) => {
    return (
      (keys[0] === playerOneAttack && keys[1] === playerTwoBlock) ||
      (keys[0] === playerTwoAttack && keys[1] === playerOneBlock)
    );
  };

  // setting fighters details
  useEffect(() => {
    if (selectedPair.playerOne.id && selectedPair.playerTwo.id) {
      setFighterOneDetails(selectedPair.playerOne);
      setFighterTwoDetails(selectedPair.playerTwo);
    }
  }, [selectedPair]);

  // recording sequence of pressed keys
  useEffect(() => {
    if (keysPressed) {
      if (finalKeys.length >= 2) {
        setfinalKeys([]); // emptying after 2 keypresses or a combo
      }

      if (keysPressed.length === 3) {
        setfinalKeys(keysPressed); // already an array, combos
      } else {
        setfinalKeys((prev) => [...prev, keysPressed]);
      }
    }
  }, [keysPressed]);

  useEffect(() => {
    if (finalKeys) {
      updateHealth(finalKeys);
    }
  }, [finalKeys]);

  useEffect(() => {
    defineWinner(fighterOneDetails.health, fighterTwoDetails.health);
  }, [fighterOneDetails.health, fighterTwoDetails.health]);

  return {
    fighterOneDetails,
    fighterTwoDetails,
    winner,
  };
};
