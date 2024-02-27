import { createConnection, ConnectionOptions } from 'typeorm';
import { Inventory, Order } from '../entities'

export const connectToDatabase = async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'khaled',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'dema',
    entities: [Inventory, Order],
    synchronize: process.env.SYNC === 'true' || false
  };

  return await createConnection(connectionOptions);
};
