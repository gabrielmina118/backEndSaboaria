import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";
import { app } from "../../src";
import request from "supertest";

describe("GET em /produts", () => {
  it("Deve retornar uma lista de produtos", async () => {
    const response = await request(app)
      .get("/products")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        categoria_id: expect.any(String),
        descricao: expect.any(String),
        essencia_id: expect.any(String),
        foto: expect.any(String),
        ingredientes: expect.any(String),
        nome: expect.any(String),
        preco: expect.any(Number),
        quantidade: expect.any(Number),
        tamanho: expect.any(String),
      })
    );
  });
});

let page;
describe("GET em products?page=2", () => {
    it("Deve retornar uma lista de produtos por pagina", async () => {
      const response = await request(app)
        .get("/products?page=2")
        .set("Accept", "application/json")
        .expect("content-type", /json/)
        .expect(200);
  
      expect(response.body.length).toEqual(10)
    });
  });