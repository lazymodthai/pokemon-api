import { Sequelize } from 'sequelize-typescript';
import { Users } from './users.entity';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pokemon1234',
  database: 'pokemon_db',
  models: [Users],
});

export default sequelize;
