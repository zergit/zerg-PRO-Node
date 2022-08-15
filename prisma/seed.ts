import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();



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