import { Scenes } from 'telegraf';
import { MyContext } from '../Types/context';

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
		ctx.reply('Укажите адрес строкой!!!');
		ctx.scene.reenter();
	}
});
addressScene.on('message', (ctx) => ctx.reply('Давай лучше адрес!'));

// export const productsScene = new Scenes.BaseScene<MyContext>('products');
// addressScene.enter((ctx) => ctx.reply('Пожалуйста выберите продукт'));
// addressScene.on('text', (ctx) => {
// 	const currAddress = String(ctx.message.text);
// 	if (currAddress) {
// 		ctx.reply('Спасибо за Ваш выбор!!!');
// 		ctx.scene.leave();
// 	} else {
// 		ctx.reply('Укажите город строкой!!!');
// 		ctx.scene.reenter();
// 	}
// });
// addressScene.on('message', (ctx) => ctx.reply('Давай лучше адрес!'));
