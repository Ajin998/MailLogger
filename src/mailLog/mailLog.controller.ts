import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { IMail } from './interface/mailLog.interface';
import { MailService } from './mailLog.service';
import { FilterDto } from './dto/getLogs.filter.dto';
import { Roles, UsersRole } from './decorators/roles.decorator';
import { RolesGuard } from './Guards/roles.guard';
@UseGuards(RolesGuard)
@Controller('mailLog')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get() // http://localhost:3000/mailLog
  @Roles(UsersRole)
  getLogs(@Query(ValidationPipe) filterDto: FilterDto): Promise<IMail[]> {
    try {
      if (Object.keys(filterDto).length)
        return this.mailService.getLogsFiltered(filterDto);
      else return this.mailService.fetchLogs();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to return all logs from the service',
      );
    }
  }
}
