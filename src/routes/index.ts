import { Router } from "express";
import user from "./user";
import movie from "./movie";
import movieRent from "./movieRent";

const routes = Router();

routes.use("/usuario", user);
routes.use("/filme", movie);
routes.use("/aluguel", movieRent);

export default routes;
