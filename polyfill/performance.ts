import ".";

const numbers = Array.from(
  { length: 1_000_000 },
  (_, index) => index - 500_000
);

console.time("filterGroups");
const [_negatives, _evens, _odds] = numbers.filterGroups(
  number => number < 0,
  number => number % 2 === 0,
  number => number % 2 !== 0
);
console.timeEnd("filterGroups");

console.time("filters");
const _negatives2 = numbers.filter(number => number < 0);
const _evens2 = numbers.filter(number => number >= 0 && number % 2 === 0);
const _odds2 = numbers.filter(number => number >= 0 && number % 2 !== 0);
console.timeEnd("filters");
