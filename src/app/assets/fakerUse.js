import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
export const generateUsers = (count = 20) => {
  return faker.helpers.multiple(createRandomUser, { count });
};
