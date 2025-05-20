import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeders/users';
import { seedTweets } from './seeders/tweets';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed users first (and get the created users)
  const users = await seedUsers();

  // Then seed tweets and interactions
  await seedTweets(users);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
