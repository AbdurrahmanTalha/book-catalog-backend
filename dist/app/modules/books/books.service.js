"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers_1 = __importDefault(require("../../../helpers/paginationHelpers"));
const books_constants_1 = require("./books.constants");
const books_model_1 = __importDefault(require("./books.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllBooksService = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.default)(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constants_1.bookFilterableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield books_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = yield books_model_1.default.countDocuments(whereConditions).exec();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const createBookService = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.create(book);
    return result;
});
const getBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.findById(id).exec();
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exist");
    }
    return result;
});
const updateBookService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.default.findById(id).exec();
    console.log(isExist);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield books_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).exec();
    return result;
});
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.default.findById(id).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not found");
    }
    const result = yield books_model_1.default.findByIdAndDelete(id).exec();
    return result;
});
const addReviewService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.default.findById(id).exec();
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    const result = yield books_model_1.default.findByIdAndUpdate(id, {
        $push: { reviews: payload },
    }, { new: true }).exec();
    return result;
});
exports.default = {
    getAllBooksService,
    createBookService,
    getBookService,
    updateBookService,
    deleteBookService,
    addReviewService,
};
