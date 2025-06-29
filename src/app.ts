import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET /expenses - Fetch all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// GET /expenses/:id - Fetch expense by ID
app.get('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const expense = await prisma.expense.findUnique({ where: { id } });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// POST /expenses - Create a new expense
app.post('/expenses', async (req, res) => {
  const { amount, category, date, description } = req.body;
  if (
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof date !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const expense = await prisma.expense.create({
      data: {
        amount,
        category,
        date: new Date(date),
        description,
      },
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// PUT /expenses/:id - Update an existing expense
app.put('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { amount, category, date, description } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  if (
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof date !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const expense = await prisma.expense.update({
      where: { id },
      data: {
        amount,
        category,
        date: new Date(date),
        description,
      },
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// DELETE /expenses/:id - Delete an expense
app.delete('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await prisma.expense.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

export default app;
