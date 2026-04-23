import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE visits, reservations, cats, users RESTART IDENTITY CASCADE;`;

  const password = await bcrypt.hash('Pass1234', 10);

  await prisma.user.createMany({
    data: [
      { email: 'admin@catcafe.com', password, role: 'ADMIN' },
      { email: 'alice@test.com', password, role: 'USER' },
      { email: 'bob@test.com', password, role: 'USER' },
    ],
  });

  await prisma.cat.createMany({
    data: [
      { name: 'Milo', age: 2, breed: 'Tabby', status: 'available' },
      { name: 'Gwen', age: 1, breed: 'Domestic Shorthair', status: 'available' },
      { name: 'Luna', age: 4, breed: 'Siamese', status: 'resting' },
      { name: 'Pepper', age: 3, breed: 'Tuxedo', status: 'available' },
    ],
  });

  await prisma.reservation.createMany({
    data: [
      {
        userId: 2,
        date: '2026-04-24',
        time: '13:00',
        numberGuests: 3,
        status: 'confirmed',
      },
      {
        userId: 3,
        date: '2026-04-25',
        time: '10:30',
        numberGuests: 2,
        status: 'confirmed',
      },
      {
        userId: 2,
        date: '2026-04-26',
        time: '15:00',
        numberGuests: 1,
        status: 'cancelled',
      },
    ],
  });

  await prisma.visit.createMany({
    data: [
      { reservationId: 1, catId: 1 },
      { reservationId: 1, catId: 2 },
      { reservationId: 2, catId: 3 },
    ],
  });

  console.log('Seed completed successfully.');
} catch (error) {
  console.error('Seed failed:', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
