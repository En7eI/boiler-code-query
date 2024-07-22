import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ModelName } from '../prisma/type';

@Injectable()
export class QueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findWithPrisma(model: ModelName, query: any) {
    const prismaModel = this.prisma[model as keyof PrismaService] as any;
    const { search, limit, offset, sortBy, sortOrder, ...filters } = query;

    return prismaModel.findMany({
      where: {
        ...filters,
        ...(search && { name: { contains: search, mode: 'insensitive' } }),
      },
      take: limit,
      skip: offset,
      orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
    });
  }

  async createWithPrisma(model: ModelName, data: any) {
    const prismaModel = this.prisma[model as keyof PrismaService] as any;
    return prismaModel.create({
      data,
    });
  }

  async updateWithPrisma(model: ModelName, id: string, data: any) {
    const prismaModel = this.prisma[model as keyof PrismaService] as any;
    return prismaModel.update({
      where: { id },
      data,
    });
  }

  async searchWithElasticsearch(index: string, query: any) {
    const { search, limit, offset, sortBy, sortOrder, ...filters } = query;

    const body: any = {
      query: {
        bool: {
          must: [
            ...(search ? [{ match: { name: search } }] : []),
            ...Object.entries(filters).map(([field, value]) => ({
              match: { [field]: value },
            })),
          ],
        },
      },
      size: limit,
      from: offset,
      sort: sortBy ? [{ [sortBy]: { order: sortOrder || 'asc' } }] : undefined,
    };

    return this.elasticsearchService.search({
      index,
      body,
    });
  }
}
