import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  readonly sendAt: Date;
  @IsOptional()
  @IsString()
  readonly actionType: string;
  @IsOptional()
  @IsString()
  readonly from: string;
  @IsOptional()
  @IsString()
  readonly to: string;
}
