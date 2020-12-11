import {PrismaClient} from "@prisma/client";

const movieModel = new PrismaClient().movies;

export interface IMovieController {
  title: string;
  director: string;
  quantity: number;
}

export interface IMovieFilter {
  title: string | null;
  director: string | null;
  disponible: boolean;
}

export class MovieController {
  async createMovie(movie: IMovieController): Promise<string> {
    try {
      const movieInserted = await movieModel.create({
        data: {
          ...movie
        }
      });
      return movieInserted.title;
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível cadastrar filme.");
    }
  }

  async getMovies(): Promise<IMovieController[]> {
    try {
      return movieModel.findMany();
    } catch (error) {
      throw new Error("Não foram encontrado filmes.");
    }
  }

  async updateMovie(title: string, movie: IMovieController) {
    try {
      const movieToUpdate = await movieModel.findFirst({where: {
        title: {
          equals: title
        }
      }});

      if (!movieToUpdate) {
        throw new Error("Filme não cadastrado no sistema. ");
      }

      if (movieToUpdate.deleted_at) {
        throw new Error("Esse filme foi deletado.");
      }

      await movieModel.update({
        where: {
          id: movieToUpdate.id,
        },
        data: {
          ...movie
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(title: string) {
    try {
      const movieToDelete = await movieModel.findFirst({ where: {
          title: {
            equals: title
        }
      }});

      if (!movieToDelete) {
        throw new Error("Filme não cadastrado no sistema. ");
      }

      await movieModel.update({where: {id: movieToDelete.id}, data: {
        deleted_at: new Date()
      }})
    } catch (error) {
      throw error;
    }
  }
  async filterMovies(filter: IMovieFilter): Promise<IMovieController[]> {
    try {
      
      return movieModel.findMany({
        where: {
          title: filter.title?? undefined,
          director: filter.director?? undefined,
          quantity:  filter.disponible ? {
            gte: 1
          } : undefined,
        }
      });
      
    } catch (error) {
      throw new Error("Não foi possível encontrar filmes.");
    }
  }
}
