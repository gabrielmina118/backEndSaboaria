import frisby from "frisby";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const mongoUrl = process.env.DB_MONGO_CONFIG;
const url = "http://localhost:3000";

describe("1 - Endpoint de buscar todas as essências", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("essences");
  });

  beforeEach(async () => {
    await db.collection("essences").deleteMany({});
    const essence = [
      {
        nome: "essencia teste",
      },
      {
        nome: "Nova essencia teste",
      },
    ];
    await db.collection("essences").insertMany(essence);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado que é possível listas todas as essencias", async () => {
    await frisby
      .get(`${url}/allEssences`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        expect(body.length).toBeGreaterThan(0);
      });
  });
});

describe.skip("2 - Endpoint de criar uma essência", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("essences");
  });

  beforeEach(async () => {
    await db.collection("essences").deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado quando o nome da essência não é informado", async () => {
    await frisby
      .post(`${url}/essence`, {
        nome: "",
      })
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`Essencia não informada`);
      });
  });

  it("Será validado que é possível listas todas as essencias", async () => {
    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.createEssence).toHaveProperty("_id");
        expect(result.createEssence.nome).toBe("essencia teste");
        expect(result.message).toBe(`Cadastrado com sucesso`);
      });
  });
});

describe("3 - Endpoint de Atualizar uma essência", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("essences");
  });

  beforeEach(async () => {
    await db.collection("essences").deleteMany({});
    const essence = {
      nome: "essencia teste",
    };

    await db.collection("essences").insertOne(essence);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado quando o nome da essência não é informado", async () => {
    await frisby
      .post(`${url}/essence`, {
        nome: "",
      })
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`Essencia não informada`);
      });
  });

  it("Será validado que é possível atualizar uma receita", async () => {
    let result;

    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby
      .put(`${url}/essence/${result.createEssence._id}`, {
        nome: "Nova essencia teste",
      })
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        const resultEssence = JSON.parse(body);
        expect(resultEssence.updateEssence).toHaveProperty("_id");
        expect(resultEssence.updateEssence).toHaveProperty("nome");
        expect(resultEssence.message).toBe(`Essência atualizada com sucesso`);
      });
  });
});

describe("4 - Endpoint de deletar uma essência", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("essences");
  });

  beforeEach(async () => {
    await db.collection("essences").deleteMany({});
    const essence = [
      {
        nome: "essencia teste",
      },
      {
        nome: "Nova essencia teste",
      },
    ];
    await db.collection("essences").insertMany(essence);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado quando o id for inválido", async () => {
    let result;

    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby.delete(`${url}/essence/123`).expect("status", 500);
  });

  it("Será validado deletar uma essência", async () => {
    let result;

    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby
      .delete(`${url}/essence/${result.createEssence._id}`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        const resultResponse = JSON.parse(body);
        expect(resultResponse.message).toBe(
          `Essência com id :${result.createEssence._id} deletada com sucesso`
        );
      });
  });
});

describe("5 - Endpoint de buscar essência por id", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("essences");
  });

  beforeEach(async () => {
    await db.collection("essences").deleteMany({});
    const essence = [
      {
        nome: "essencia teste",
      },
      {
        nome: "Nova essencia teste",
      },
    ];
    await db.collection("essences").insertMany(essence);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado quando o id for inválido", async () => {
    let result;

    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby.get(`${url}/essence/123`).expect("status", 500);
  });

  it("Será validado buscar uma essência por Id", async () => {
    let result;

    await frisby
      .post(`${url}/essence`, {
        nome: "essencia teste",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby
      .get(`${url}/essence/${result.createEssence._id}`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        const resultResponse = JSON.parse(body);
        expect(resultResponse.message).toHaveProperty("_id");
        expect(resultResponse.message.nome).toBe("essencia teste");
      });
  });
});
