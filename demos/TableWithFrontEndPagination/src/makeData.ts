import faker from "@faker-js/faker";

export type Person = {
  age: number;
  firstName: string;
  lastName: string;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
  visits: number;
};

const range = (len: number) => {
  const arr: number[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    age: faker.datatype.number(96),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0],
    visits: faker.datatype.number(1000),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth];
    return range(len).map((_): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
