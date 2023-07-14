import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelpers";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import { bookFilterableFields } from "./books.constants";
import { IBook, IBookFilters } from "./books.interface";
import Books from "./books.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getAllBooksService = async (
    paginationOptions: IPaginationOptions,
    filters: IBookFilters,
): Promise<IGenericResponse<IBook[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: bookFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Books.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await Books.countDocuments(whereConditions).exec();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const createBookService = async (book: IBook): Promise<IBook | null> => {
    const result = await Books.create(book);
    return result;
};

const getBookService = async (id: string): Promise<IBook | null> => {
    const result = await Books.findById(id).exec();
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exist");
    }
    return result;
};

const updateBookService = async (
    id: string,
    payload: Partial<IBook>,
): Promise<IBook | null> => {
    const isExist = await Books.findById(id).exec();
    console.log(isExist);
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
    }

    const result = await Books.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).exec();
    return result;
};

const deleteBookService = async (id: string): Promise<IBook | null> => {
    const isExist = await Books.findById(id).exec();
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book Not found");
    }

    const result = await Books.findByIdAndDelete(id).exec();
    return result;
};

export default {
    getAllBooksService,
    createBookService,
    getBookService,
    updateBookService,
    deleteBookService,
};
