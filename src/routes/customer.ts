import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { AppError } from "../middleware/AppError";

const customerRouter = Router();
const customerRepository = AppDataSource.getRepository(Customer);

// Create Customer
customerRouter.post("/", async (req, res, next) => {
  const { name, mobilePhone, balance } = req.body;

  const existingCustomer = await customerRepository.findOneBy({ mobilePhone });
  if (existingCustomer) {
    throw new AppError("Customer with this mobile phone already exists", 400);
  }
  const customer = customerRepository.create({ name, mobilePhone, balance });
  await customerRepository.save(customer);
  res.status(201).json(customer);
});

// Get All Customers
customerRouter.get("/", async (req, res, next) => {
  const customers = await customerRepository.find();
  res.json(customers);
});

// Get Customer by ID
customerRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const customer = await customerRepository.findOneBy({ id: parseInt(id) });
  if (!customer) {
    throw new AppError("Customer not found", 404);
  }
  res.json(customer);
});

// Edit Customer
customerRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, mobilePhone, balance } = req.body;

  const customer = await customerRepository.findOneBy({ id: parseInt(id) });
  if (!customer) {
    throw new AppError("Customer not found", 404);
  }
  customer.name = name;
  customer.mobilePhone = mobilePhone;
  customer.balance = balance;
  await customerRepository.save(customer);
  res.json(customer);
});

// Delete Customer
customerRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const customer = await customerRepository.findOneBy({ id: parseInt(id) });
  if (!customer) {
    throw new AppError("Customer not found", 404);
  }
  await customerRepository.remove(customer);
  res.status(204).send();
});

export default customerRouter;
