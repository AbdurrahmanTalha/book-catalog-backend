import { z } from "zod";
import { bookGenres } from "./books.constants";

export const createBookZodValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        author: z.string({
            required_error: "Author is required",
        }),
        genre: z.enum([...bookGenres] as [string, ...string[]], {
            required_error: "Genre is required",
        }),
        publishedAt: z.string({
            required_error: "Published year is required",
        }),
    }),
});

export const updateBookZodValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        author: z.string({
            required_error: "Author is required",
        }),
        genre: z.enum([...bookGenres] as [string, ...string[]], {
            required_error: "Genre is reuqired",
        }),
        publishedAt: z.string({
            required_error: "Published year is required",
        }),
    }),
});
