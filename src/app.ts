import { PrismaClient } from '@prisma/client';
import { Markup, Scenes } from 'telegraf';
import 'dotenv/config';
import { MyContext } from './Types/context';
import LocalSession from 'telegraf-session-local';
import { bot } from './Bot/bot.service';
import { addressScene, cityScene } from './Scenes/locationScenes';
import { webApp } from 'telegraf/typings/button';

const prisma = new PrismaClient();

export class App {
	public async init(): Promise<void> {
		await prisma.$connect();
		// await prisma.user.findMany({ where: { id: { gte: 1 } } });
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

const webAppUrl = 'https//ya.ru';

bot.command('/test', (ctx) => {
	ctx.reply('Заполните пожалуйста форму', Markup.keyboard(['Форма']));
});

bot.command('image', (ctx) => {
	ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300?random' });
});

bot.command('city', (ctx) => ctx.scene.enter('city'));
bot.command('address', (ctx) => ctx.scene.enter('address'));

bot.start((ctx) =>
	ctx.reply(
		'Вас приветствует чат бот по продаже товаров китайской народной медицины! Пожалуйста, укажите свой город и адрес - для этого наберите команду /city ',
	),
);

bot.on('text', async (ctx) => {
	// Explicit usage
	await ctx.telegram.sendMessage(ctx.message.chat.id, 'Привет набери команду /start');

	// Using context shortcut
	await ctx.reply(`Hello ${ctx.state.role}`);
});

// 	if (text === '/form') {
// 		bot.telegram.sendMessage(chatId, 'Пожалуйста наберите команду /start', {
// 			reply_markup: {
// 				inline_keyboard: [[{ text: 'Заполнить форму', web_app: { url: webAppUrl } }]],
// 			},
// 		});
// 	}
// });

bot.launch();
