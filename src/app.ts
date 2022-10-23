import { PrismaClient } from '@prisma/client';
import { Markup, Scenes } from 'telegraf';
import 'dotenv/config';
import { MyContext } from './Types/context';
import LocalSession from 'telegraf-session-local';
import { bot } from './Bot/bot.service';
import { addressScene, cityScene } from './Scenes/locationScenes';

const prisma = new PrismaClient();

export class App {
	public async init(): Promise<void> {
		await prisma.$connect();
		await prisma.user.findMany({ where: { id: { gte: 1 } } });
	}
}

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
