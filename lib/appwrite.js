import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.teamdodo.dodo",
  projectId: "66c6384a003b78a1a4f4",
  databaseId: "66c63a89002b29fb3752",
  userCollectionId: "66c63af0002f378c6c45",
  videoCollectionId: "66c63b480013d0432d4d",
  storageId: "66c63d50000138021a37",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
