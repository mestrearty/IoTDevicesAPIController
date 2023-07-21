"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const routes_1 = require("./routes");
const xmlparser = require("express-xml-bodyparser");
const xmlOptions = {
    normalizeTags: true
};
class App {
    constructor(port) {
        this.port = 8081;
        this.port = port;
        this.express = express();
        this.middlewares();
        this.routes();
        this.server();
    }
    middlewares() {
        this.express.use(express.json());
        this.express.use(xmlparser(xmlOptions));
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
    }
    routes() {
        this.express.use(routes_1.default);
    }
    server() {
        this.express.listen(this.port, () => {
            console.log(`server started at http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map