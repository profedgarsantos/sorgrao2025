import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core" // Changed from type-only import

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

    // Mapeamento de grupo_id para roles
    const userRoles = []

    if (user.grupo_id === 1) {
      userRoles.push("admin")
    } else if (user.grupo_id === 3) {
      userRoles.push("vendedor")
    } else if (user.grupo_id === 4) {
      userRoles.push("comissionado")
    }

    return roles.some((role) => userRoles.includes(role))
  }
}
