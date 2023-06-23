import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let Server;
let URL;

const connection = async () => {
  if (Server) {
    return MongoClient.connect(URL, OPTIONS);
  }
  Server = await MongoMemoryServer.create();
  URL = await Server.getUri();

  return MongoClient.connect(URL, OPTIONS);
};

export default connection;
