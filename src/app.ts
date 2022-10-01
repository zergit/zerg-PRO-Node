import { PrismaClient } from '@prisma/client';
import { Markup, Scenes, Telegraf } from 'telegraf';
import 'dotenv/config';
import { MyContext } from './Types/context';
import LocalSession from 'telegraf-session-local';
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

export const cityScene = new Scenes.BaseScene<MyContext>('city');

cityScene.enter((ctx) => ctx.reply('Укажите свой город'));

cityScene.on('text', (ctx) => {
	const currCity = String(ctx.message.text);
	if (currCity) {
		ctx.reply('Спасибо за Город!!!');
		ctx.scene.enter('address');
	} else {
		ctx.reply('Укажите город строкой!!!');
		ctx.scene.reenter();
	}
});
cityScene.on('message', (ctx) => ctx.reply('Давай лучше город!'));

export const addressScene = new Scenes.BaseScene<MyContext>('address');
addressScene.enter((ctx) => ctx.reply('Укажите свой адрес'));
addressScene.on('text', (ctx) => {
	const currAddress = String(ctx.message.text);
	if (currAddress) {
		ctx.reply('Спасибо за Адрес!!!');
		ctx.scene.leave();
	} else {
		ctx.reply('Укажите город строкой!!!');
		ctx.scene.reenter();
	}
});
addressScene.on('message', (ctx) => ctx.reply('Давай лучше адрес!'));

const bot = new Telegraf<MyContext>(token);

const stage = new Scenes.Stage<MyContext>([cityScene, addressScene]);
const { leave, enter } = Scenes.Stage;
bot.use(new LocalSession({ database: 'session.json' }).middleware());
bot.use(stage.middleware());
bot.use((ctx, next) => {
	ctx.session.myProp;
	ctx.scene.session.myProps;
	next();
});

bot.command('city', (ctx) => ctx.scene.enter('city'));
bot.command('address', (ctx) => ctx.scene.enter('address'));

bot.start((ctx) =>
	ctx.reply(
		'Вас приветствует чат бот по продаже товаров китайской народной медицины! Пожалуйста, укажите свой город и адрес - для этого наберите команду /city ',
	),
);

bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('test', (ctx) => {
	ctx.reply('test', Markup.keyboard(['Город', 'Адрес']).oneTime().resize());
});

bot.on('text', (ctx) => {
	ctx.reply('Привет, набери команду /start');
});

bot.launch();
