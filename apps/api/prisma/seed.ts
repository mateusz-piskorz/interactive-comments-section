/* eslint-disable @typescript-eslint/no-var-requires */

const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const load = async () => {
  try {
    await db.user.deleteMany();
    await db.comment.deleteMany();

    //users
    await db.user.createMany({
      data: [
        {
          avatar: 'avatar1',
          color: 'burlywood',
          username: 'user1',
          password: 'admin',
          id: 'user1',
        },
        { avatar: 'avatar2', color: 'orange', username: 'user2', id: 'user2' },
        {
          avatar: 'avatar3',
          color: 'seagreen',
          username: 'user3',
          id: 'user3',
        },
      ],
    });

    //comments
    await db.comment.createMany({
      data: [
        {
          authorId: 'user1',
          content: 'test comment 1',
          id: 'comment1',
          bookId: '6751e7f7-a8b7-488b-bde7-8606822d2338',
        },
        {
          authorId: 'user2',
          content: 'test comment 2',
          id: 'comment2',
          bookId: '6751e7f7-a8b7-488b-bde7-8606822d2338',
        },
        {
          authorId: 'user3',
          content: 'test comment 3',
          id: 'comment3',
          parentId: 'comment2',
          bookId: '6751e7f7-a8b7-488b-bde7-8606822d2338',
        },
      ],
    });

    console.log('added seed data to db');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
};

load();
