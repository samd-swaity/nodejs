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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Customer_1 = require("../entity/Customer");
const AppError_1 = require("../middleware/AppError");
const customerRouter = (0, express_1.Router)();
const customerRepository = data_source_1.AppDataSource.getRepository(Customer_1.Customer);
// Create Customer
customerRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobilePhone, balance } = req.body;
    try {
        const existingCustomer = yield customerRepository.findOneBy({ mobilePhone });
        if (existingCustomer) {
            throw new AppError_1.AppError('Customer with this mobile phone already exists', 400);
        }
        const customer = customerRepository.create({ name, mobilePhone, balance });
        yield customerRepository.save(customer);
        res.status(201).json(customer);
    }
    catch (error) {
        next(error);
    }
}));
// Get All Customers
customerRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customerRepository.find();
        res.json(customers);
    }
    catch (error) {
        next(error);
    }
}));
// Get Customer by ID
customerRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const customer = yield customerRepository.findOneBy({ id: parseInt(id) });
        if (!customer) {
            throw new AppError_1.AppError('Customer not found', 404);
        }
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
}));
// Edit Customer
customerRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, mobilePhone, balance } = req.body;
    try {
        const customer = yield customerRepository.findOneBy({ id: parseInt(id) });
        if (!customer) {
            throw new AppError_1.AppError('Customer not found', 404);
        }
        customer.name = name;
        customer.mobilePhone = mobilePhone;
        customer.balance = balance;
        yield customerRepository.save(customer);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
}));
// Delete Customer
customerRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const customer = yield customerRepository.findOneBy({ id: parseInt(id) });
        if (!customer) {
            throw new AppError_1.AppError('Customer not found', 404);
        }
        yield customerRepository.remove(customer);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = customerRouter;
