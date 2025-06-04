import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "src/common/types/jwt-payload";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CurrentLoggedInUser } from "src/common/types/current-logged-in-user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    validate(payload: JwtPayload): CurrentLoggedInUser {
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        }
    }
}