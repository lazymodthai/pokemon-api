import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class Users extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
