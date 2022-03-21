import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoString = (configService: ConfigService): string => {
  const { login, password, host } = configService.get("mongo");

  return `mongodb+srv://${login}:${password}@${host}/myFirstDatabase?retryWrites=true&w=majority`;
}

export const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {

  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  }
}
