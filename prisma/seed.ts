import { PrismaClient } from '@prisma/client';
import { products } from '../src/Products/product.service';
import { user } from '../src/User/user.service';

const prisma = new PrismaClient();

async function main(): Promise<void> {
	await prisma.$connect();

	const createProducts = await prisma.products.createMany({ data: products });
	const createUser = await prisma.user.createMany({ data: user });

	await prisma.$disconnect();
}

main();
