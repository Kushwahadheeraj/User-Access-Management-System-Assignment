import { DataSource } from "typeorm";
import { User } from "../entity/User";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "user_management",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
}); 