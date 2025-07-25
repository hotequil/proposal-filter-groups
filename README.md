# Filter groups proposal

[TC39 proposal](https://es.discourse.group/t/implement-the-array-prototype-filtergroups/2407) to implement the `Array.prototype.filterGroups`.

![Proposal Stage 0](https://img.shields.io/badge/Proposal-Stage--0-blue)
![Version](https://img.shields.io/npm/v/@hotequil/proposal-filter-groups.svg)
![Downloads](https://img.shields.io/npm/dt/@hotequil/proposal-filter-groups.svg)
![License](https://img.shields.io/npm/l/@hotequil/proposal-filter-groups)

![NPM](https://nodei.co/npm/@hotequil/proposal-filter-groups.png?downloads=true&downloadRank=true&stars=true)

## Reason

JavaScript has a lot of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) methods, but when you have to filter many items, you have to install external libraries, create helpers or write many filters to achieve the same result. I want to collaborate with the community and specification. It's a simple solution for my problems, and it can be your solution too.

## How it works

1. It receives one or more **functions (callbacks)** that return a **boolean**;
2. It returns the filtered **arrays** inside a parent **array**.

## Installation

Install the package using [npm](https://www.npmjs.com) or another package manager you want. You can see the [package in npm](https://www.npmjs.com/package/@hotequil/proposal-filter-groups).

```shell
npm install @hotequil/proposal-filter-groups
```

## Usage

Import the polyfill in the main, index or app file of your project.

```TypeScript
import "@hotequil/proposal-filter-groups";
```

## Typical cases

Follow the examples in TypeScript below.

```TypeScript
// Imports omitted…

export const vehicles: Vehicle[] = [
  { name: "Toyota Corolla", type: "sedan" },
  { name: "Honda Fit", type: "hatch" },
  { name: "Honda Civic", type: "sedan" },
  { name: "Honda CRV", type: "suv" },
  { name: "Toyota Etios", type: "hatch" },
  { name: "Honda Odyssey", type: "van" },
  { name: "Toyota Dyna", type: "truck" },
  { name: "Toyota SW4", type: "suv" }
];

const [sedanVehicles, hatchVehicles, suvVehicles, otherVehicles] =
  vehicles.filterGroups(
    // You can use the index and array parameters too, it helps to mix many conditions
    ({ type }, _index, _array) => type === "sedan",
    vehicle => vehicle.type === "hatch",
    vehicle => vehicle.type === "suv"
  );
// [
//   [
//     { name: "Toyota Corolla", type: "sedan" },
//     { name: "Honda Civic", type: "sedan" }
//   ],
//   [
//     { name: "Honda Fit", type: "hatch" },
//     { name: "Toyota Etios", type: "hatch" }
//   ],
//   [
//     { name: "Honda CRV", type: "suv" },
//     { name: "Toyota SW4", type: "suv" }
//   ],
//   [
//     { name: "Honda Odyssey", type: "van" },
//     { name: "Toyota Dyna", type: "truck" }
//   ]
// ]

// The first callbacks have preference
const [vehiclesWithName, vehiclesWithType] =
  vehicles.filterGroups(
    ({ name }) => name.length > 0,
    ({ type }) => type.length > 0
  );
// [
//   [
//     { name: "Toyota Corolla", type: "sedan" },
//     { name: "Honda Fit", type: "hatch" },
//     { name: "Honda Civic", type: "sedan" },
//     { name: "Honda CRV", type: "suv" },
//     { name: "Toyota Etios", type: "hatch" },
//     { name: "Honda Odyssey", type: "van" },
//     { name: "Toyota Dyna", type: "truck" },
//     { name: "Toyota SW4", type: "suv" }
//   ],
//   []
// ]

// It'll throw a TypeError, it isn't allowed use numbers in callbacks
vehicles.filterGroups(
  () => true,
  () => true,
  1,
  () => true
)

// It'll throw a TypeError, it isn't allowed use strings in callbacks
vehicles.filterGroups(
  () => true,
  () => true,
  "type",
  () => true
)

// It'll throw a TypeError, it isn't allowed use booleans in callbacks
vehicles.filterGroups(
  () => true,
  () => true,
  true,
  () => true
)

// It'll throw a TypeError, it isn't allowed use objects in callbacks
vehicles.filterGroups(
  () => true,
  () => true,
  {},
  () => true
)

export const users: User[] = [
  { name: "Oliver", status: { name: "active" } },
  { name: "Henry", status: { name: "inactive" } },
  { name: "Thomas", status: { name: "active" } }
];

const [activeUsers, inactiveUsers] = users.filterGroups(
  user => user.status.name === "active"
);
// [
//   [
//     { name: "Oliver", status: { name: "active" } },
//     { name: "Thomas", status: { name: "active" } }
//   ],
//   [
//     { name: "Henry", status: { name: "inactive" } }
//   ]
// ]
```

## Performance

Test the [performance.ts](polyfill/performance.ts) file.

```TypeScript
const numbers = Array.from(
  { length: 1_000_000 },
  (_, index) => index - 500_000
);

// 25.043ms
const [_negatives, _evens, _odds] = numbers.filterGroups(
  number => number < 0,
  number => number % 2 === 0,
  number => number % 2 !== 0
);

// 29.505ms
const _negatives2 = numbers.filter(number => number < 0);
const _evens2 = numbers.filter(number => number >= 0 && number % 2 === 0);
const _odds2 = numbers.filter(number => number >= 0 && number % 2 !== 0);
```

## Similar methods

There are some similar methods, but they are not exactly the same as this proposal.

| Method name                                                                                             | Responsible                  |
| ------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | [TC39](https://tc39.es)      |
| [groupBy](https://lodash.com/docs#groupBy)                                                              | [Lodash](https://lodash.com) |
| [partition](https://lodash.com/docs#partition)                                                          | [Lodash](https://lodash.com) |

## Proposer

- Author: [@hotequil](https://github.com/hotequil);
- Champion: _no one at the moment_.

_This repository there isn't other third dependency, see the [package.json](package.json)._
