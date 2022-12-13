import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const mongoUri = mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();
  allCollections.forEach(async (collection) => {
    collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});
