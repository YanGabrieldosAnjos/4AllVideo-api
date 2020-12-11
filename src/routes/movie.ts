import { Router, Request, Response } from "express";
import { verifyJWT } from "../middlewares/auth";
import {
  MovieController,
  IMovieController,
  IMovieFilter,
} from "../controllers/movie";
const router = Router();

router.post("/inserir", verifyJWT, async (req: Request, res: Response) => {
  const movie = new MovieController();

  try {
    const movieInfo: IMovieController = req.body;

    res.status(201).send({ title: await movie.createMovie(movieInfo) });
  } catch (error) {
    throw error;
  }
});

router.get("/", [verifyJWT], async (req: Request, res: Response) => {
  const movie = new MovieController();
  try {
    res.status(200).send(await movie.getMovies());
  } catch (error) {
    throw error;
  }
});

router.get("/filtrar", [verifyJWT], async (req: Request, res: Response) => {
  const movie = new MovieController();
  try {
    const filter: IMovieFilter = req.body;
    res.status(200).send(await movie.filterMovies(filter));
  } catch (error) {
    throw error;
  }
});

router.put("/", [verifyJWT], async (req: Request, res: Response) => {
  const movie = new MovieController();
  try {
    const movieInfo: IMovieController = req.body;
    await movie.updateMovie(movieInfo.title, movieInfo);
    res.status(200).send({ status: "livro atualizado com sucesso!" });
  } catch (error) {
    throw error;
  }
});

router.delete("/", [verifyJWT], async (req: Request, res: Response) => {
  const movie = new MovieController();
  try {
    const bookInfo: IMovieController = req.body;
    await movie.deleteMovie(bookInfo.title);
    res.status(200).send({ status: "livro deletado com sucesso!" });
  } catch (error) {
    throw error;
  }
});
export default router;
