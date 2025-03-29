import { TableColumnOptions } from 'typeorm';

export default [
  {
    name: 'id',
    type: 'varchar',
    length: '36',
    isPrimary: true,
    generationStrategy: 'uuid',
  } as TableColumnOptions,
];
