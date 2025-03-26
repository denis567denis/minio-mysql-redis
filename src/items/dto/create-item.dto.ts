import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  dateEOra: string;

  @IsString()
  @IsNotEmpty()
  status: 'online' | 'offline';

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  stato: string;

  @IsString()
  @IsNotEmpty()
  incaricato: string;

  @IsString()
  @IsNotEmpty()
  operatore: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
