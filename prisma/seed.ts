import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const product = {
	title: 'Чай Сань Вэй',
	appointment: 'Улучшение памяти и работы мозга',
	description: 'Чай «Сань Вэй» изготовлен на основе древней рецептуры и культуры чаепития в Китае.'


}

const user = {

	name: 'Антон',
	email: 'a@a',
	password: 'sdsf'
}

async function main() {
	await prisma.$connect();
	const createdUser = await prisma.user.create({ data: user });
	await prisma.$disconnect();
}

main();