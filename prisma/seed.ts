import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // 会議室データの作成
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        name: '会議室A',
        capacity: 8,
      },
    }),
    prisma.room.create({
      data: {
        name: '会議室B',
        capacity: 12,
      },
    }),
    prisma.room.create({
      data: {
        name: '会議室C',
        capacity: 20,
      },
    }),
  ]);

  // サンプル予約データの作成
  await Promise.all([
    prisma.reservation.create({
      data: {
        roomId: rooms[0].id,
        userName: '山田太郎',
        email: 'yamada@example.com',
        date: new Date('2024-04-01'),
        startTime: '10:00',
        endTime: '11:00',
        purpose: '週次ミーティング',
        status: 'CONFIRMED',
      },
    }),
    prisma.reservation.create({
      data: {
        roomId: rooms[1].id,
        userName: '鈴木花子',
        email: 'suzuki@example.com',
        date: new Date('2024-04-01'),
        startTime: '14:00',
        endTime: '15:00',
        purpose: 'クライアントミーティング',
        status: 'CONFIRMED',
      },
    }),
  ]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
