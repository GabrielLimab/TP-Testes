import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

async function run() {
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();
  
  const firstUserId = '0730ffac-d039-4194-9571-01aa2aa0efbd';
  const secondUserId = '00880d75-a933-4fef-94ab-e05744435297';

  const firstPassword = await hash('123Seguro&', 10);
  const secondPassword = await hash('123Seguro&', 10);
  /**
   * Create user
   */
  await Promise.all([
    prisma.user.create({
      data: {
        id: firstUserId,
        name: 'Gabriel Lima Barros',
        email: 'lima@gmail.com',
        password: firstPassword,
      }
    }),

    prisma.user.create({
      data: {
        id: secondUserId,
        name: 'Gabriel Teixeira Carvalho',
        email: 'teixeira@gmail.com',
        password: secondPassword,
        ratings: {
          create: {
            rating: 10,
            review: 'Muito bom',
            movieId: 313369,
            watched: true,
          }
        }
      }
    })
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })