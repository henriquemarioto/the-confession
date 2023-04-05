import "express-async-errors";
import express, { Express } from 'express';
import routes from './routes';
import cors from "cors";
import errorHandling from "./Middlewares/errorHandling.middleware";

class App{
    server: Express

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandling();   
    }

    middlewares() {
        this.server.use(cors());        
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    errorHandling() {
        this.server.use(errorHandling);
    }
}

export default new App().server;