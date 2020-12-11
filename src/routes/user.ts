import { Router, Request, Response } from "express";
import { INewUser, UserController } from "../controllers/user";
import * as jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth";
const router = Router();

interface ILoginRequest {
  email: string;
  password: string;
}
router.post("/login", async (req: Request, res: Response) => {
  const user = new UserController();

  try {
    const { email, password }: ILoginRequest = req.body;
    const userInfo = await user.login(email, password);
    const payload = userInfo.id;
    if (userInfo) {
      const token = jwt.sign({ payload }, process.env.SECRET!, {
        expiresIn: 500,
      });
      return res.json({ auth: true, token, userId: userInfo.id });
    }
    return res.status(500).json({ message: "login inválido!" });
  } catch (error) {
    throw error;
  }
});

router.post("/inserir", async (req: Request, res: Response) => {
  const user = new UserController();

  try {
    const userInfo: INewUser = req.body;
    res.status(201).send({ name: await user.createUser(userInfo) });
  } catch (error) {
    throw error;
  }
});

router.get("/filmes", [verifyJWT], async (req: Request, res: Response) => {
  const user = new UserController();

  try {
    const { email }: INewUser = req.body;

    res.status(200).send(await user.listRentedBooks(email));
  } catch (error) {
    throw error;
  }
});

export default router;
