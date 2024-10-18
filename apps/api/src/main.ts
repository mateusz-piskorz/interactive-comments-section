import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { SESSION_EXPIRATION } from './constants/session';

const db = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.JWT_SECRET || 'programmers like coffee',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_EXPIRATION,
      },
      store: new PrismaSessionStore(db, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  await app.listen(process.env.API_PORT || 3001);
}
bootstrap();
