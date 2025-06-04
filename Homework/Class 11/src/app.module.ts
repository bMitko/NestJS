import { Module } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { UsersModule } from './users/users.module';
import { HabitatsModule } from './habitats/habitats.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    CreaturesModule, 
    UsersModule, 
    HabitatsModule, 
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
