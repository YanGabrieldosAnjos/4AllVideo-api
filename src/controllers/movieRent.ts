import {PrismaClient} from "@prisma/client";

const models = new PrismaClient(); 

export class MovieRentController {
  async rentMovie(userId: string, title: string): Promise<string> {
    try {
     
      const movieToRent = await  models.movies.findFirst({ where: {title} })
      const user = await models.users.findUnique({where: {id: userId}});
      
      
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      
      
      if (!movieToRent || movieToRent.quantity < 0) {
        throw new Error("Filme em falta.");
      }
      
      const rentedMovies = await models.rents.findMany({
        where: {
          user_id: userId,
          movie_id: movieToRent.id
        },
        include: {
          movies: true
        },
      });

      if (rentedMovies.length > 1) {
        throw new Error("Usuário já alugou o filme.");
      }
      
    const updateMovie = await models.movies.update({
        where: {
          id: movieToRent.id,
        },
        data:{
          quantity: movieToRent.quantity--,
        }
      });
      await models.rents.create({
        data: {
          movies: {
            create: {
              ...updateMovie
            }
          },
          users: {
            create: {
              ...user,
            }
          }
        }
      })
      
      return movieToRent.title;
    } catch (error) {
      throw error;
    }
  }

  async devolveMovie(userId: string, title: string): Promise<string> {
    try {
      const movie = await models.movies.findFirst({ where: {title} });
      
      if(!movie){
        throw new Error("Titulo inexistente.");  
      }
      const rentedMovie = await models.rents.findFirst({where: {user_id: userId, movie_id: movie.id} })
      
      if (!rentedMovie) {
        throw new Error("Filme não foi alugado pelo usuário");
      }

    

      await models.movies.update({
        where: {
          id: movie.id,
        },
        data:{
          quantity: movie.quantity++,
        }
      });
      
      await models.rents.update({
        where: {
          id: rentedMovie.id,
        },
        data:{
          deleted_at: new Date()
        }
      })

      return movie.title;
    } catch (error) {
      throw error;
    }
  }
}
