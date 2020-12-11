import { UserRest } from "./mocks/user";

import * as faker from "faker";
describe("user", () => {
  test("create", async () => {
    const userRest = new UserRest();
    const userData = {
      username: faker.random.word(),
      password: faker.random.word(),
      name: faker.random.word(),
    };
    const name = await userRest.postUser(userData);
    expect(userData.name).toBe(name);
  });

  test("login", async () => {
    const userRest = new UserRest();
    const userData = {
      username: faker.random.word(),
      password: faker.random.word(),
      name: faker.random.word(),
    };
    await userRest.postUser(userData);

    const token = await userRest.loginUser(
      userData.username,
      userData.password
    );

    expect(token.auth).toBeTruthy();
    expect(token.token.length).toBeGreaterThan(0);
  });
});
