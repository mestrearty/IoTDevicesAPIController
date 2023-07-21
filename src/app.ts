import * as express from 'express'
import * as cors from 'cors'
import routes from './routes'
import * as xmlparser from 'express-xml-bodyparser'
const xmlOptions = {
    normalizeTags: true
};

class App {
    public express: express.Application
    protected port: number = 8081

    public constructor(port: number) {
        this.port = port
        this.express = express()
        this.middlewares();
        this.routes()
        this.server()
    }

    public middlewares(): void {
        this.express.use(express.json())
        this.express.use(xmlparser(xmlOptions))
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors())

    }

    private routes(): void {
        this.express.use(routes)
    }

    public server(): void {
        this.express.listen(this.port, () => {
            console.log(`server started at http://localhost:${this.port}`);
        })
    }

}

export default App

