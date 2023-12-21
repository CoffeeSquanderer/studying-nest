import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;
}
