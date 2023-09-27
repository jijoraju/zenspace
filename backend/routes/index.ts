import express, { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userTypes = await prisma.userType.findMany();
    res.json(userTypes);
  } catch (error) {
    console.error("Error fetching user types:", error);
    res.status(500).send("Error fetching user types");
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
