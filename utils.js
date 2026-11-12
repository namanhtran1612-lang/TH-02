import { RESULTS, MULTIPLIERS, MIN_BET, MAX_BET, BET_STEP } from './data';

export const validateBet = (bet, score) => {
  const num = Number(bet);
  if (
    !Number.isInteger(num) ||
    num < MIN_BET ||
    num > MAX_BET ||
    num % BET_STEP !== 0 ||
    num > score
  ) {
    return 'Mức cược phải là bội số của 100, từ 100 đến 500 và không vượt quá số điểm đang có';
  }
  return '';
};

export const calcChange = (bet, level, correct) => {
  const mult = MULTIPLIERS[level] || 1;
  return correct ? Math.round(bet * mult) : -bet;
};

export const getResult = (score) => {
  const found = RESULTS.find((r) => score >= r.min);
  return found ? found.title : 'Cháy túi';
};
