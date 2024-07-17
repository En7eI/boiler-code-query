import { PrismaClient } from '@prisma/client';

type ModelKeys = Exclude<keyof PrismaClient, 
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$executeRaw'
  | '$queryRaw'
  | '$extends'
>;

export type ModelName = Extract<ModelKeys, string>;