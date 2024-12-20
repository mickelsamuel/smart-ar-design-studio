import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/user', async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, name }
    });
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend service running on http://localhost:${PORT}`);
});