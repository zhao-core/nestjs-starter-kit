import { TableColumnOptions } from 'typeorm';

export default [
  {
    name: 'id',
    type: 'varchar',
    length: '36',
    isPrimary: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
  } as TableColumnOptions,
];
