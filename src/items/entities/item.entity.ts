import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateEOra: string;

  @Column()
  status: 'online' | 'offline';

  @Column()
  tipo: string;

  @Column()
  stato: string;

  @Column()
  incaricato: string;

  @Column()
  operatore: string;

  @Column()
  note: string;

  @Column()
  country: string;

  @Column()
  imageKey: string;
}
