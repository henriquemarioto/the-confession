import { Router } from 'express';

class Routes{
    routes: Router;

    constructor() {       
        this.routes = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.routes.get('/is-alive', (req, res) => res.json({ message: 'The Confession is alive' }))
    }
}

export default new Routes().routes;