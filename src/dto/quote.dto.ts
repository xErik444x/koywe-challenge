import { IsNotEmpty, IsNumber, IsString, Min, IsIn } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}