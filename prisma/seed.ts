import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Location = {
	city: '',
	address: '',
};

async function main(): Promise<void> {
	await prisma.$connect();
	const createLocation = await prisma.location.create({ data: Location });
	const createProducts = await prisma.products.createMany({ data: products });
	await prisma.$disconnect();
}

main();
