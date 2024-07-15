import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class QueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findWithPrisma(model: any, query: any) {
    return this.prisma[model].findMany({
      where: query,
    });
  }

  async searchWithElasticsearch(index: string, query: any) {
    return this.elasticsearchService.search({
      index,
      body: query,
    });
  }
}