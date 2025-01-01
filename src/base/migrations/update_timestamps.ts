export default [
  {
    name: 'created_at',
    type: 'timestamp',
    isNullable: true,
    comment: 'create time',
    default: 'NOW()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
    comment: 'update time',
    default: 'NOW()',
  },
];
