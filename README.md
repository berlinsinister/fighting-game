# Getting Started

### `npm i`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In component `Board` need add logic which set data of selected fighters (name, configuration and image) in left and right side.

Button `Fight` appears when two fighers are selected. When click on `Fight` you will be redirected to `Arena` page.

On that page you need implemented main fight logic in hook `useFight`.
So this hook must return data for `fighterOneDetails`, `fighterTwoDetails` and `winner`.

Fighters hit each other with help of keys: `A` (fighter one) and `J` (fighter two).
Fighters can block punches with help of keys: `D` (fighter one) and `L` (fighter two), in such case fighter takes no damage. Also fighter can't hit while blocking a punch.

The fighter's health indicator is reduced by the amount of damage caused by the enemy.
It can be determined using the `getDamage` function, which will return `getHitPower - getBlockPower` (or 0 if the fighter "left" the blow completely, that is, the strength of the block is greater than the strength of the blow).

Also, the damage caused must be displayed using the health indicator, which is located above the fighters.

`Implement features`:

- `getHitPower`, which would calculate the impact force (the amount of damage to the enemy's health) using the formula `power = attack * criticalHitChance`, where `criticalHitChance` is a random number from `1` to `2`;
- `getBlockPower`, which would calculate the block strength (damage of the enemy's blow) using the formula `power = defense * dodgeChance`, where `dodgeChance` is a random number from `1` to `2`. No need to round the results of these functions.

Fighters can also deal critical hits that cannot be blocked and are calculated using the formula `2 * attack`,where attack is a characteristic of a fighter. In order for a fighter to strike such a blow, you need to simultaneously press the 3 corresponding keys specified in the `controls.js` file.

This strike can be applied no more than every `10 seconds`.

The button press logic needs to be written in the `useKeyPress` hook, the result is displayed in the `useFight` hook

`Note`: Existing functionality and code do not need to be changed, as autotests will check the work.
