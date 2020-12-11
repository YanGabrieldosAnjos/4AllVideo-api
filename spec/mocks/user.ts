import request from "supertest";
import { INewUser } from "../../src/controllers/user";
import * as app from "../../src/index";

export class UserRest {
  async postUser(user: INewUser) {
    const res = await request(app.default)
      .post("/api/usuario/inserir")
      .set("Accept", "application/json")
      .send(user);
    const nameRes: string = res.body.name;
    return nameRes;
  }

  async loginUser(username: string, password: string) {
    const res = await request(app.default)
      .post("/api/usuario/login")
      .set("Accept", "application/json")
      .send({ username, password });
    const user = res.body;
    return user;
  }
}
