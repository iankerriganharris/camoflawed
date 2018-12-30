interface IDatabaseConfigAttributes {
  username: string
  password: string
  database: string
  host: string
  port: number
  // type: string;
}

const baseConfig = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432
  // type: process.env.DB_TYPE || 'postgres',
  // cache: {
  //   type: 'redis',
  //   options: {
  //     host: process.env.CACHE_HOST,
  //     port: Number(process.env.CACHE_PORT) || 6379
  //   }
  // }
}

const development = {}

const test = {}

const production = {}

export const databaseConfig: IDatabaseConfigAttributes =
  process.env.NODE_ENV === 'production'
    ? {
        ...baseConfig,
        ...production
      }
    : process.env.NODE_ENV === 'test'
    ? {
        ...baseConfig,
        ...test
      }
    : process.env.NODE_ENV === 'development'
    ? {
        ...baseConfig,
        ...development
      }
    : baseConfig
