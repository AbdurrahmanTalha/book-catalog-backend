import { paginationFields } from "../../../constant/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./books.constants";
import { IBook, IBookFilters } from "./books.interface";
import service from "./books.service";
import IGenericResponse from "../../../interfaces/genericResponse";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import IPaginationOptions from "../../../interfaces/pagination";

const getAllBooks = catchAsync(async (req, res) => {
    const filters: IBookFilters = pick(req.query, bookFilterableFields);
    const paginationOptions: IPaginationOptions = pick(
        req.query,
        paginationFields,
    );
    const books: IGenericResponse<IBook[]> = await service.getAllBooksService(
        paginationOptions,
        filters,
    );
    sendResponse<IBook[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: books.data,
        meta: books.meta,
        message: "Successfully found books",
    });
});

const createBook = catchAsync(async (req, res) => {
    const book = await service.createBookService(req.body);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: book,
        message: "Successfully created book",
    });
});

const getSpecificBook = catchAsync(async (req, res) => {
    const book = await service.getBookService(req.params.id);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: book,
        message: "Successfully found book",
    });
});

const editBook = catchAsync(async (req, res) => {
    const updatedBook = await service.updateBookService(
        req.params.id,
        req.body,
    );
    console.log(updatedBook);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: updatedBook,
        message: "Successfully updated book",
    });
});

const deleteBook = catchAsync(async (req, res) => {
    const result = await service.deleteBookService(req.params.id);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: result,
        message: "Successfully deleted book",
    });
});

export default {
    getAllBooks,
    createBook,
    getSpecificBook,
    editBook,
    deleteBook,
};
