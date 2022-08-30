import { PrismaClient } from '@prisma/client';
import { Markup, Telegraf } from 'telegraf';
import 'dotenv/config';

const prisma = new PrismaClient();

export class App {
	public async init(): Promise<void> {
		await prisma.$connect();
	}
}

const token = process.env.TOKEN;
if (!token) {
	throw new Error('Не задан token');
}

const bot = new Telegraf(token);

bot.command('test', (ctx) => {
	ctx.reply('test', Markup.keyboard(['Город', 'Адрес']).oneTime().resize());
});

bot.on('text', (ctx) => {
	ctx.reply('Привет');
});

bot.launch();
