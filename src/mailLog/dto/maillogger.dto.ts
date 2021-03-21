import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class MailDto {
  @IsOptional()
  @IsString()
  readonly uid: string;
  @IsString()
  @IsNotEmpty()
  readonly actionType: string;
  @IsString()
  @IsNotEmpty()
  readonly from: string;
  @IsString()
  @IsNotEmpty()
  readonly to: string;
  @IsString()
  @IsNotEmpty()
  readonly subject: string;
  @IsDate()
  @IsNotEmpty()
  readonly sendAt: Date;
}
