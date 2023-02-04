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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getAllProducts = void 0;
const http_status_1 = __importDefault(require("http-status"));
const models_1 = __importDefault(require("../models"));
const error_util_1 = require("../utils/error-util");
// get all products.
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //get all products.
            const products = yield models_1.default.product.findMany();
            res.status(http_status_1.default.OK).json(products);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield models_1.default.$disconnect();
        }
    });
}
exports.getAllProducts = getAllProducts;
// [ADMIN] create a product
// data reference: https://fakeapi.platzi.com/en/rest/categories#get-all-products-by-category
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, price, isFeatured, categories, images } = req.body;
        try {
            //create a product
            const product = yield models_1.default.product.create({
                data: { title, description, price, isFeatured, categories, images },
            });
            res.status(http_status_1.default.CREATED).json(product);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield models_1.default.$disconnect();
        }
    });
}
exports.createProduct = createProduct;
// [ADMIN] delete a product
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // check if id is valid.
            const foundProduct = yield models_1.default.product.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundProduct) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            //delete a product
            const deletedProduct = yield models_1.default.product.delete({
                where: { id },
            });
            res.status(http_status_1.default.OK).json(deletedProduct);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield models_1.default.$disconnect();
        }
    });
}
exports.deleteProduct = deleteProduct;
// [ADMIN] update a product
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // check if id is valid.
            const foundProduct = yield models_1.default.product.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundProduct) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            //update a product
            const updatedProduct = yield models_1.default.product.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            res.status(http_status_1.default.OK).json(updatedProduct);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield models_1.default.$disconnect();
        }
    });
}
exports.updateProduct = updateProduct;
//# sourceMappingURL=products-controller.js.map