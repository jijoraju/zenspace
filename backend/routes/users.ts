import express, {Request, Response, Router} from "express";

const router: Router = express.Router();

router.get("/users", (req:Request, res: Response) => {
    res.json("Hello");
});

export default router;

