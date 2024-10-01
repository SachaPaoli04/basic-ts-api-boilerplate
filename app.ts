import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import filmsRouter from "./routes/films";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);

let getRequestCount = 0;

// Middleware pour enregistrer les requêtes GET
app.use((req, _res, next) => {
    if (req.method === 'GET') {
        getRequestCount++;
        console.log(`Nombre de requêtes GET depuis le démarrage du serveur : ${getRequestCount}`);
    }
    next();
});

app.use("/films", filmsRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).send("Something broke!");
  };
  
  app.use(errorHandler);
  

export default app;
