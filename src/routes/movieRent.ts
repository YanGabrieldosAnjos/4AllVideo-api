import { Router, Request, Response } from "express";
import { MovieRentController } from "../controllers/movieRent";
import { verifyJWT } from "../middlewares/auth";

const router = Router();
interface IMovieRentRequest {
  userId: string;
  title: string;
}
router.post("/", [verifyJWT], async (req: Request, res: Response) => {
  const bookRent = new MovieRentController();

  try {
    const { userId, title }: IMovieRentRequest = req.body;

    res.status(200).send(await bookRent.rentMovie(userId, title));
  } catch (error) {
    throw error;
  }
});

router.post("/devolucao", [verifyJWT], async (req: Request, res: Response) => {
  const bookRent = new MovieRentController();

  try {
    const { userId, title }: IMovieRentRequest = req.body;

    res.status(200).send(await bookRent.devolveMovie(userId, title));
  } catch (error) {
    throw error;
  }
});

export default router;
