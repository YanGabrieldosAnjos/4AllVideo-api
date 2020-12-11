import request from "supertest";
import { IBookController, IBookFilter } from "../../src/controllers/movie";
import * as app from "../../src/index";

export class BookRest {
  async postBook(book: IBookController, token: string): Promise<string> {
    const res = await request(app.default)
      .post("/api/livro/inserir")
      .set("auth", token)
      .send(book);

    const title: string = res.body.title;
    return title;
  }

  async getBooks(token: string): Promise<IBookController[]> {
    const res = await request(app.default)
      .get("/api/livro/")
      .set("auth", token);

    return res.body;
  }

  async filterBooks(
    token: string,
    filter: IBookFilter
  ): Promise<IBookController[]> {
    const res = await request(app.default)
      .get("/api/livro/filtrar")
      .set("auth", token)
      .send(filter);

    return res.body;
  }
}
