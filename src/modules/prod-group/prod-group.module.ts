import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdGroupController } from './prod-group.controller';
import { ProdGroupService } from './prod-group.service';
import { ProdGroup } from './prod-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdGroup])],
  controllers: [ProdGroupController],
  providers: [ProdGroupService],
  exports: [ProdGroupService],
})
export class ProdGroupModule {}
