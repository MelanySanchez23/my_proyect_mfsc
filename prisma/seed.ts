import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant Principal',
    },
  });

  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Melany Sanchez',
        email: 'melanyfer.san@gmail.com',
        password,
        tenantId: tenant.id,
      },
      {
        name: 'Carla Orozco',
        email: 'carla34oroz@gmail.com',
        password,
        tenantId: tenant.id,
      },
    ],
  });

  console.log('Datos iniciales creados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });