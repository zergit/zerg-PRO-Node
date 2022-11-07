import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { MyContext } from '../Types/context';

dotenv.config();

const token = process.env.TOKEN;
if (!token) {
	throw new Error('token not found');
}

export const bot = new Telegraf<MyContext>(token);
