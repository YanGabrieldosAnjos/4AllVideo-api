import * as bcrypt from "bcrypt";
import {movies, PrismaClient, users} from "@prisma/client";

const models = new PrismaClient();

export interface INewUser {
  name: string;
  password: string;
  email: string;
}

export class UserController {
  async createUser(user: INewUser): Promise<string> {
    try {
      const cryptedPassword = await bcrypt.hash(user.password, 10);
      const insertedUser = await models.users.create({ data: { ...user, password: cryptedPassword }});

      return insertedUser.name;
    } catch (error) {
      throw new Error("Não foi possível cadastrar novo usuário.");
    }
  }

  async login(email: string, password: string): Promise<users> {
    try {
      const user = await models.users.findFirst({ where: {email} });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Não encontrado.");
      }
      
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async listRentedBooks(email: string): Promise<movies[]> {
    try {
      const user = await models.users.findFirst({ where: {email} });
      if (!user) {
        throw new Error("Usuário inexistente.");
      }
      const moviesRented = await models.rents.findMany({
        where: {
          user_id: user.id,
          deleted_at: null
        },
        select: {
          movies: true
        }
      });
      return moviesRented.map(movie => movie.movies);
    } catch (error) {
      throw error;
    }
  }
}
