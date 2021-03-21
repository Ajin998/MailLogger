import { Module } from '@nestjs/common';
import { MailController } from './mailLog.controller';
import { MailService } from './mailLog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSchema } from './schema/mailLogger.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Mail', schema: MailSchema }])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
