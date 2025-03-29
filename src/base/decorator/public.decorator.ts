import { SetMetadata } from '@nestjs/common';

/**
 * @description 公共装饰器
 */

// Authorization 标记为公共接口，不需要验证token以及权限
export const PublicSymbol = Symbol('MetaData:Authorization:IsPublic');
export const Public = () => SetMetadata(PublicSymbol, true);

// Role 权限控制，需要验证token，且token中的role需要包含该值才能访问该接口，否则抛出403错误
export enum Role {
  Admin = 'Admin',
  User = 'User',
  WeChatMiniProgram = 'WeChatMiniProgram',
}
export const RoleSymbol = Symbol('MetaData:Authorization:Role');
export const Roles = (...roles: Role[]) => SetMetadata(RoleSymbol, roles);
