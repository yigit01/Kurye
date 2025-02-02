import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { User, UserRole } from './user/entities/user.entity';
import * as argon2 from 'argon2';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific configuration
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  console.log('first', port);

  // Create default admin user if none exists
  const dataSource = app.get(getDataSourceToken());
  const userRepository = dataSource.getRepository(User);

  const adminExists = await userRepository.findOne({
    where: { role: UserRole.ADMIN },
  });
  console.log('adminExists', adminExists);

  if (!adminExists) {
    const hashedPassword = await argon2.hash('Admin123!');
    const adminUser = userRepository.create({
      email: 'admin@kurye.com',
      password: hashedPassword,
      fullName: 'System Admin',
      phone: '1234567890',
      role: UserRole.ADMIN,
      isActive: true,
    });
    await userRepository.save(adminUser);
    console.log('Default admin user created');
  }

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
