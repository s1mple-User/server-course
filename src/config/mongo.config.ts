import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoDBConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: 'mongodb+srv://sammi:120209@cluster0.wva9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  };
};
