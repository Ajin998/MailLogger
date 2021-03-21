import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailDto } from './dto/maillogger.dto';
import { IMail } from './interface/mailLog.interface';
import { MailDocument } from './schema/mailLogger.schema';
import { FilterDto } from './dto/getLogs.filter.dto';
@Injectable()
export class MailService {
  constructor(
    @InjectModel('Mail')
    private readonly mailmodel: Model<MailDocument>,
  ) {}

  //Method 1:-- For fetching all the logs from the database.
  async fetchLogs(): Promise<IMail[]> {
    try {
      return await this.mailmodel.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find logs from database',
        error.stack, //Just incase to know the cause of error
      );
    }
  }
  //---------------------------------------------------------------------

  //Method 2:-- For fetching logs according to the filtered results.
  async getLogsFiltered(filterDto: FilterDto): Promise<IMail[]> {
    const { sendAt, actionType, from, to } = filterDto;
    try {
      return await this.mailmodel
        .find({
          sendAt: sendAt,
          actionType: actionType,
          from: from,
          to: to,
        })
        .exec();
    } catch (error) {
      throw new NotFoundException(
        'Failed to find Logs in the database',
        error.stack,
      );
    }
  }
  //-------------------------------------------------------------------------

  //Method 3:-- For writing logs in database.
  async writeLog(MailLog: MailDto): Promise<IMail> {
    try {
      const data = await this.mailmodel.create(MailLog); //Replaced save() with create() just to resolve headache in testing part ;-)
      return data; //Dont use save method, otherwise it will produce headache in unit testing part :(
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to write logs in database',
        error.stack, // Just to know where exactly the error had occured
      );
    }
  }
}
