import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { QueryParamsDto } from '../dto/query.params.dto';
import { CreateItemDto } from '../dto/create.dto';
import { UpdateItemDto } from '../dto/update.dto';
import { ModelName } from '../prisma/type';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class QueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findWithPrisma(model: ModelName, queryParams: QueryParamsDto) {
    const { search, limit, offset, sortBy, sortOrder } = queryParams;
    const where = search ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] } : {};

    const result = await (this.prisma[model] as any).findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
    });

    return result;
  }

  async searchWithElasticsearch(index: string, queryParams: QueryParamsDto) {
    const { search, limit, offset, sortBy, sortOrder } = queryParams;

    const body: any = {
      query: {
        multi_match: {
          query: search,
          fields: ['name', 'description'],
        },
      },
      size: limit,
      from: offset,
    };

    if (sortBy) {
      body.sort = [{ [sortBy]: { order: sortOrder } }];
    }

    const searchResult = await this.elasticsearchService.search<SearchResponse>({
      index,
      body,
    });

    // Accessing hits from the search result
    return searchResult.hits.hits.map(hit => hit._source);
  }

  async createWithPrisma(model: ModelName, createItemDto: CreateItemDto) {
    const result = await (this.prisma[model] as any).create({
      data: createItemDto,
    });

    return result;
  }

  async updateWithPrisma(model: ModelName, id: string, updateItemDto: UpdateItemDto) {
    const result = await (this.prisma[model] as any).update({
      where: { id: Number(id) },
      data: updateItemDto,
    });

    return result;
  }
}
