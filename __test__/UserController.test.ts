import { Request, Response } from "express";
import ProductController from "../src/controllers/product/ProductController";
import BaseError from "../src/error/BaseError";

let request: Request;
let response: Response;
describe("Teste de criação da essencia", () => {

  it('Criar funcao com retorno 201 de status "Cadastrado com sucesso" ', async () => {
    const req = { body: { name: "Essence Name" } };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
   
  
    await ProductController.create(request, response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Cadastrado com sucesso");
  });

//   it("create function should return 500 status code and error message when essence save fails", async () => {
//     const req = { body: { name: "Essence Name" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };
//     const essenceDbMock = jest.fn().mockImplementation(() => ({
//       save: jest.fn().mockImplementation((callback) => {
//         callback(new Error("Save error"));
//       }),
//     }));
//     const createSpy = jest.spyOn(essenceDbMock.prototype, "save");
//     await ProductController.create(request, response);
//     expect(createSpy).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith({ message: "Save error" });
//   });

//   it("create function should return error status code and message when BaseError is thrown", async () => {
//     const req = { body: { name: "Essence Name" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };
//     const error = new BaseError("Base error", 400);
//     const essenceDbMock = jest.fn().mockImplementation(() => ({
//       save: jest.fn().mockImplementation(() => {
//         throw error;
//       }),
//     }));
//     const createSpy = jest.spyOn(essenceDbMock.prototype, "save");
//     await ProductController.create(request, response);
//     expect(createSpy).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(error.statusCode);
//     expect(res.send).toHaveBeenCalledWith({ message: error.message });
//   });

//   it("create function should return 500 status code and error message when an unexpected error occurs", async () => {
//     const req = { body: { name: "Essence Name" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };
//     const error = new Error("Unexpected error");
//     const essenceDbMock = jest.fn().mockImplementation(() => ({
//       save: jest.fn().mockImplementation(() => {
//         throw error;
//       }),
//     }));
//     const createSpy = jest.spyOn(essenceDbMock.prototype, "save");

//     await ProductController.create(request, response);
//     expect(createSpy).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith({ message: error.message });
//   });
});

// describe("Buscar todos os produtos", () => {
//   test("getAll should return all products", async () => {
//     const req = { query: {} };
//     const res = {
//       send: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//     const mockProductDb = {
//       find: jest
//         .fn()
//         .mockReturnValueOnce([{ name: "Product 1" }, { name: "Product 2" }]),
//     };
//     const expectedProducts = [{ name: "Product 1" }, { name: "Product 2" }];

//     await ProductController.getAll(request, response);

//     expect(mockProductDb.find).toHaveBeenCalledWith();
//     expect(res.send).toHaveBeenCalledWith(expectedProducts);
//   });

//   test("getAll should return products with pagination", async () => {
//     const req = { query: { page: "2" } };
//     const res = {
//       send: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//     const mockProductDb = {
//       find: jest
//         .fn()
//         .mockReturnValueOnce([{ name: "Product 3" }, { name: "Product 4" }]),
//     };
//     const expectedProducts = [{ name: "Product 3" }, { name: "Product 4" }];

//     await ProductController.getAll(request, response);

//     expect(mockProductDb.find).toHaveBeenCalledWith();
//     expect(res.send).toHaveBeenCalledWith(expectedProducts);
//   });

//   test("getAll should handle errors", async () => {
//     const req = { query: {} };
//     const res = {
//       send: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//     const mockProductDb = {
//       find: jest
//         .fn()
//         .mockRejectedValueOnce(new BaseError("Error message", 400)),
//     };

//     await ProductController.getAll(request, response);

//     expect(mockProductDb.find).toHaveBeenCalledWith();
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: "Error message" });
//   });

//   test("getAll should handle unexpected errors", async () => {
//     const req = { query: {} };
//     const res = {
//       send: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//     const mockProductDb = {
//       find: jest.fn().mockRejectedValueOnce(new Error("Unexpected error")),
//     };

//     await ProductController.getAll(request, response);

//     expect(mockProductDb.find).toHaveBeenCalledWith();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith({ message: "Unexpected error" });
//   });
// });
