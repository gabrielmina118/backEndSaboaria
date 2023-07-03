import frisby from "frisby";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const mongoUrl = process.env.DB_MONGO_CONFIG;
const url = "http://localhost:3000";
const secretKey = process.env.JWT_KEY;
const token = jwt.sign({ userId: "123" }, secretKey);
describe("4 -Endpoint de buscar todos os produtos", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("products");
  });

  beforeEach(async () => {
    await db.collection("products").deleteMany({});
    const products = [
      {
        nome: "sabonete",
        foto: "https://cdn.shopify.com/s/files/1/0635/1231/4071/products/product1.jpg",
        preco: 20,
        quantidade: 10,
        ingredientes:
          "Voluptatem accusantium, Rem aperiam eaque, Eaque ipsa, Vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.",
        descricao:
          "Sua fórmula suave e com\ningredientes naturais evita o ressecamento e prepara\na pele para receber a combinação nutritiva e inteligente\ndos hidratantes Natura Tododia.",
        tamanho: "450g",
        categoria_id: "63fbaf2be09213f3a8148681",
        essencia_id: "6406768ffe8c0a7114c961a3",
      },
      {
        nome: "sabonete",
        foto: "https://d1di2lzuh97fh2.cloudfront.net/files/2m/2mx/2mxnt9.jpg",
        preco: 20,
        quantidade: 10,
        ingredientes:
          "Voluptatem accusantium, Rem aperiam eaque, Eaque ipsa, Vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.",
        descricao:
          "Sua fórmula suave e com\ningredientes naturais evita o ressecamento e prepara\na pele para receber a combinação nutritiva e inteligente\ndos hidratantes Natura Tododia.",
        tamanho: "150g",
        categoria_id: "63fbaf2be09213f3a8148681",
        essencia_id: "6407ce31a426c435a3829489",
      },
    ];
    await db.collection("products").insertMany(products);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado que é possível buscar todos os produtos", async () => {
    await frisby
      .get(`${url}/products`)
      .expect("status", 200)
      .then((response) => {
        const { json } = response;
        expect(json[0].nome).toBe("sabonete");
        expect(json[0].foto).toBe(
          "https://cdn.shopify.com/s/files/1/0635/1231/4071/products/product1.jpg"
        );
        expect(json[0].preco).toBe(20);
        expect(json[0].quantidade).toBe(10);
      });
  });

  it("Será validado que é possível buscar os produtos paginados", async () => {
    await frisby
      .get(`${url}/products?page=2`)
      .expect("status", 200)
      .then((response) => {
        const { json } = response;
        expect(json.length).toBe(10);
      });
  });
});

describe("5 -Endpoint de buscar produtos por Id", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("products");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado produto com id errado", async () => {
    await frisby
      .get(`${url}/product/63fbb471e09213f3a8148600`)
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          "Não é possível encontrar produto com id 63fbb471e09213f3a8148600"
        );
      });
  });

  it("Será validado que é possível buscar o produto por Id", async () => {
    await frisby
      .get(`${url}/product/63fbb471e09213f3a8148688`)
      .expect("status", 200)
      .then((response) => {
        const { json } = response;
        expect(json.product._id).toBe("63fbb471e09213f3a8148688");
        expect(json.productRelative.length).toBeGreaterThan(0);
      });
  });
});

describe("6 -Endpoint de buscar produtos por nome", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("products");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado produto com nome correto", async () => {
    await frisby
      .get(`${url}/produtosNome?nome=sabonete`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it("Será validado produto com nome errado", async () => {
    await frisby
      .get(`${url}/produtosNome?nome=xxx`)
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe("Produto com nome xxx não encontrado");
      });
  });

  it("Será validado produto sem nome", async () => {
    await frisby
      .get(`${url}/produtosNome?nome=`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        expect(body).toBe("[]");
      });
  });
});
