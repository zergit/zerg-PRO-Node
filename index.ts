import { PrismaClient } from '@prisma/client';
import { Markup, Telegraf } from 'telegraf';
import 'dotenv/config'


const prisma = new PrismaClient();

class App {
	async init() {
		await prisma.$connect();
	}
}

const app = new App();
app.init();


const token = process.env.TOKEN;
if (!token) {
	throw new Error('Не задан token');
}

const bot = new Telegraf(token);

bot.command('test', (ctx) => {
	ctx.reply('test', Markup.keyboard(
		['Готово']
	).oneTime().resize());
})

bot.launch(); 