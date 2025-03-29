import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import {
  softDeletes,
  updateTimestamps,
  uuidPrimary,
} from '../../../base/migrations';
import { TABLE_NAME } from '../../user/entities/user.entity';

export class Users1636917857168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          ...uuidPrimary,
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: true,
          },
          ...updateTimestamps,
          ...softDeletes,
        ],
      }),
    );

    await queryRunner.createIndex(
      TABLE_NAME,
      new TableIndex({
        name: 'IDX_USERS_NAME',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
