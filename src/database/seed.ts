import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const existe = await AppDataSource.query(
    `SELECT id FROM usuarios WHERE email = $1`,
    ['admin@gmail.com'],
  );

  if (existe.length > 0) {
    console.log('Usuário admin já existe.');
    await AppDataSource.destroy();
    return;
  }

  const senhaHash = await bcrypt.hash('123123', 12);

  await AppDataSource.query(
    `INSERT INTO usuarios (nome, email, senha_hash, nivel_acesso) VALUES ($1, $2, $3, $4)`,
    ['Admin', 'admin@gmail.com', senhaHash, 'admin'],
  );

  console.log('Admin criado com sucesso.');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
