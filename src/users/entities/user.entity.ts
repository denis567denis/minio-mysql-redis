import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  COMMERCIALE = 'Commerciale',
  OPERATORE = 'Operatore',
  AMMINISTRATORE = 'Amministratore',
  DIRETTORE = 'Direttore',
  BLOCCATO = 'Bloccato',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OPERATORE,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
