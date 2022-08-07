import { PrismaClient } from '@prisma/client';
import { Telegraf } from 'telegraf';
import 'dotenv/config'

// const { PrismaClient } = require('@prisma/client');
// require('dotenv').config();
// const { Telegraf } = require('telegraf');

const prisma = new PrismaClient();

class App {
	async init() {
		await prisma.$connect();
		await prisma.user.findFirst({ where: { id: 1 } })

		// console.log(process.env);
	}
}

const app = new App();
app.init();


const token = process.env.TOKEN;
if (!token) {
	throw new Error('Не задан token');
}

const bot = new Telegraf(token);

bot.on('text', (ctx) => {
	ctx.reply('Привет');
})

bot.launch(); 