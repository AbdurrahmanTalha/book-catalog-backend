import express from "express";
import bookRouter from "../modules/books/books.route";

const router = express.Router();

const routes = [
    {
        path: "/book",
        route: bookRouter,
    },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
