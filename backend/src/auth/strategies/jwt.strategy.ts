import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config" // Changed from type-only import

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("SUPABASE_JWT_SECRET", "secretkey"),
    })
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      grupo_id: payload.grupo_id,
    }
  }
}
