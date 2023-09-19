import { Module } from '@nestjs/common';
import { TestcodeController } from './testcode.controller';

@Module({
  controllers: [TestcodeController],
})
export class TestcodeModule {}
