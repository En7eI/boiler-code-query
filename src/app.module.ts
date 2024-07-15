import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/service';
import { QueryService } from './query/service';
import { DynamicController } from './query/controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  controllers: [DynamicController],
  providers: [PrismaService, QueryService],
})
export class AppModule {}