import { BaseEntity } from '../../base/entity/base.entity';
import { Entity, Column } from 'typeorm';

export const TABLE_NAME = 'tb_admin_user';
@Entity({
  name: TABLE_NAME,
})
export class UserEntity extends BaseEntity {
  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'password',
  })
  passwordHash: string;

  @Column()
  token: string;
}
