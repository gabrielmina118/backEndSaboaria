import frisby from "frisby";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const mongoUrl = process.env.DB_MONGO_CONFIG;
const url = "http://localhost:3000";
const secretKey = process.env.JWT_KEY;
const token = jwt.sign({ userId: "123" }, secretKey);
const idToken = jwt.verify(token, secretKey);
let userDB;

describe.skip("1- Endpoint de atualizar CPF", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("users");
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
    const user = {
      name: "Naruto Uzumaki",
      email: "naruto@gmail.com",
      cpf: "450.087.058-26",
      password: "naruto123",
    };
    userDB = await db.collection("users").insertOne(user);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validade que o campo "cpf" é obrigatório', async () => {
    const response = await frisby
      .setup({
        request: {
          headers: {
            authorization: `${token}`,
          },
        },
      })
      .post(`${url}/user/cpf`, {})
      .expect("status", 404);

    const result = response.json;
    expect(result.message).toBe("CPF deve ser enviado");
  });

  it("Será validade que o usuário atualizou o cpf", async () => {
    const response = await frisby
      .setup({
        request: {
          headers: {
            authorization: `${token}`,
          },
        },
      })
      .post(`${url}/user/cpf`, {
        cpf: "450.087.058-26",
      })
      .expect("status", 201);

    const result = response.json;
    expect(result.message).toBe(
      "CPF : 450.087.058-26 , cadastrado com sucesso"
    );
  });
});

describe.skip("2 - Endpoint de buscar usuário por ID", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("users");
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
    const user = {
      name: "Naruto Uzumaki",
      email: "naruto@gmail.com",
      cpf: "450.087.058-26",
      password: "naruto123",
    };
    userDB = await db.collection("users").insertOne(user);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Será validado que o usuário não foi encontrado", async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: `${token}`,
          },
        },
      })
      .post(`${url}/user`)
      .expect("status", 404);
  });
});

describe("3 - Endpoint de logar usuário", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUrl);
    db = connection.db("users");
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
    const user = {
      name: "Naruto Uzumaki",
      email: "naruto@gmail.com",
      cpf: "450.087.058-26",
      password: "naruto123",
    };
    userDB = await db.collection("users").insertOne(user);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/user/login`, {
        password: "naruto123",
      })
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`O valor 'email' esta faltando`);
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/user/login`, {
        email: "naruto@gmail.com",
      })
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`O valor 'password' esta faltando`);
      });
  });

  it('Será validado que o campo "email" não está cadastrado', async () => {
    await frisby
      .post(`${url}/user/login`, {
        email: "sasuke@gmail.com",
        password: "naruto123",
      })
      .expect("status", 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`Email sasuke@gmail.com não cadastrado`);
      });
  });

  it('Será validado que o campo "password" está incorreto', async () => {
    await frisby
      .post(`${url}/user/login`, {
        email: "naruto@gmail.com",
        password: "naruto",
      })
      .expect("status", 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`senha incorreta`);
      });
  });

  it("Será validado que é possível fazer login com sucesso", async () => {
    await frisby
      .post(`${url}/user/login`, {
        email: "naruto@gmail.com",
        password: "naruto123",
      })
      .expect("status", 200)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.token).not.toBeNull();
        console.log("json", json);
      });
  });
});
