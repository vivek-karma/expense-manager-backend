"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
// Use require for express to avoid type inference issues with Express 5 and TypeScript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const appInstance = express();
const prisma = new PrismaClient();
appInstance.use(express.json());
// GET /expenses - Fetch all expenses
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
appInstance.get('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield prisma.expense.findMany();
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
}));
// GET /expenses/:id - Fetch expense by ID
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
appInstance.get('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    try {
        const expense = yield prisma.expense.findUnique({ where: { id } });
        if (!expense)
            return res.status(404).json({ error: 'Expense not found' });
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense' });
    }
}));
// POST /expenses - Create a new expense
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
appInstance.post('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, category, date, description } = req.body;
    if (typeof amount !== 'number' ||
        typeof category !== 'string' ||
        typeof date !== 'string' ||
        typeof description !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    try {
        const expense = yield prisma.expense.create({
            data: {
                amount,
                category,
                date: new Date(date),
                description,
            },
        });
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
}));
// PUT /expenses/:id - Update an existing expense
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
appInstance.put('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { amount, category, date, description } = req.body;
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    if (typeof amount !== 'number' ||
        typeof category !== 'string' ||
        typeof date !== 'string' ||
        typeof description !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    try {
        const expense = yield prisma.expense.update({
            where: { id },
            data: {
                amount,
                category,
                date: new Date(date),
                description,
            },
        });
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
}));
// DELETE /expenses/:id - Delete an expense
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
appInstance.delete('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    try {
        yield prisma.expense.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
}));
module.exports = appInstance;
