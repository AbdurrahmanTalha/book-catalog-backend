import express from "express";
import bookRouter from "../modules/books/books.route";
import authRouter from "../modules/auth/auth.route";

const router = express.Router();

const routes = [
    {
        path: "/book",
        route: bookRouter,
    },
    {
        path: "/auth",
        route: authRouter,
    },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
