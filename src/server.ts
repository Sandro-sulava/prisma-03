import express, { Request, Response } from "express";
import { prisma } from "./prisma.js";

const app = express();

app.use(express.json());

app.get("/users", async (_req: Request, res: Response) => {
  const books = await prisma.book.findMany({});

  res.json(books);
});

app.listen(4000, () => {
  console.log(`server is running on : http://localhost:4000`);
});
