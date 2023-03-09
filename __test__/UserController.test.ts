import ProductBussines from "../src/bussines/Produtct/ProductBussines";
import ProductController from "../src/controllers/product/ProductController";
import BaseError from "../src/error/BaseError";
import { IEssence } from "../src/controllers/product/interface/IEssence";
import ProductData from "../src/data/ProductData";
const input: IEssence = { nome: "Essencia teste" };

describe("Teste de criação da essencia", () => {
  it("create function should throw an error if input.nome is not provided", async () => {
    try {
    } catch (error) {
      if (error instanceof BaseError) {
        expect(ProductBussines.create(input)).rejects.toThrow(BaseError);
      }
    }
  });

  test("create function should return the response from ProductData.createEssence", async () => {
    const createEssenceMock = jest
      .fn()
      .mockReturnValue({ message: "Cadastrado com sucesso" });
    jest
      .spyOn(ProductData, "createEssence")
      .mockImplementation(createEssenceMock);

    const response = await ProductBussines.create(input);

    expect(response).toEqual({ message: "Cadastrado com sucesso" });
  });
//   test('create function should call ProductData.createEssence with the correct parameter', async () => {
//   const input = { nome: 'Teste', descricao: 'Teste' };
//   const essenceDbMock = jest.fn().mockReturnValue({ nome: 'Teste', descricao: 'Teste' });
//   const createEssenceMock = jest.fn().mockReturnValue({ success: true });
//   jest.spyOn(MyClass, 'essenceDb').mockImplementation(essenceDbMock);
//   jest.spyOn(ProductData, 'createEssence').mockImplementation(createEssenceMock);

//   await MyClass.create(input);

//   expect(essenceDbMock).toHaveBeenCalledWith(input);
//   expect(createEssenceMock).toHaveBeenCalledWith({ nome: 'Teste', descricao: 'Teste' });
// });
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
