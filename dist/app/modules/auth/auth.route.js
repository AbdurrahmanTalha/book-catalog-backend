"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/signin", (0, validateRequest_1.default)(auth_validation_1.loginZodValidationSchema), auth_controller_1.default.loginUser);
router.post("/signup", auth_controller_1.default.createUser);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.refreshZodValidationSchema), auth_controller_1.default.refreshToken);
exports.default = router;
