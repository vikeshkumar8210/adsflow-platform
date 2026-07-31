import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('AdminPass123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@adsflow.io' },
    update: {},
    create: {
      email: 'admin@adsflow.io',
      name: 'System Administrator',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Seeded default Admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });