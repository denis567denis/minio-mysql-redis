import { IsString, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  dateEOra: string;

  @IsString()
  @IsOptional()
  status: 'online' | 'offline';

  @IsString()
  @IsOptional()
  tipo: string;

  @IsString()
  @IsOptional()
  stato: string;

  @IsString()
  @IsOptional()
  incaricato: string;

  @IsString()
  @IsOptional()
  operatore: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  country: string;
}
