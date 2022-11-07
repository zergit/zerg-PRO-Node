import { PrismaClient } from '@prisma/client';
import { IProductsService } from '../src/Products/products.service.interface';

const prisma = new PrismaClient();

async function main(): Promise<void> {
	await prisma.$connect();

	// const createProducts = await prisma.products.createMany({ data: products });
	// const createUser = await prisma.userModel.createMany({ data: user });

	await prisma.$disconnect();
}

main();

const products: IProductsService[] = [
	{
		id: 1,
		title: 'Чай Сань Вэй',
		price: 3000,
		appointmen: 'Улучшение памяти и работы мозга',
		description:
			'При этом использованы 3 вида дорогих известных сортов чая и тщательно подобранные и обработанные натуральные растения.',
	},
	{
		id: 2,
		title: 'Эликсир Родиола розовая',
		price: 5000,
		appointmen: 'Повышает выносливость к гипоксии, защищает сердце и мозг',
		description:
			'Родиола розовая имеет в своем составе 17 аминокислот, 21 микроэлемент, 7 различных витаминов и другие питательные вещества.',
	},
	{
		id: 3,
		title: 'Капсулы "Линчжи Кордицепс',
		price: 1500,
		appointmen: 'Bещество разума" - улучшают работу мозга, лечат мигрени, бессоницы и т.д.',
		description:
			'Препарат будет полезен также тем, кто хочет развить свою память, повысить интеллект, улучшить способности обучаться, чувствовать, изучать языки, осознавать происходящее.',
	},
	{
		id: 4,
		title: 'Чай Гингко',
		price: 3500,
		appointmen: 'Для снижения кровяного давления',
		description:
			'Является хорошим средством для профилактики и лечения коронарной болезни сердца, стенокардии, нарушений липидного обмена.',
	},
	{
		id: 5,
		title: 'Часы «Цзянябяо» набор',
		price: 8500,
		appointmen: 'Cнижают кровяное давление, лечат бессонницу, головные боли',
		description:
			'Эффективны в терапии головных болей, звона в ушах, сердцебиений, бессонницы, жара.',
	},
];
