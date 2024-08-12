import { IAccess, IRefresh } from "./interfaces/";
import { decode, verify, sign } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { ForbiddenException, NotFoundException, Injectable } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class JWTService {
    constructor( 
        private readonly config: ConfigService,
        private readonly redis: RedisService,
    ) {}

    decodeToken = (token: string) => {
        return decode(token);
    };

    verifyAccess = (token: string) => {
        const access: any = this.config.get<string>("JWT_ACCESS_KEY");
        try {
            return verify(token, access);
        } catch (error) {
            throw new ForbiddenException("Invalid access token");
        }
    };

    verifyRefresh = (token: string) => {
        const refresh: any = this.config.get<string>("JWT_REFRESH_KEY");
        try {
            return verify(token, refresh);
        } catch (error) {
            throw new ForbiddenException("Invalid refresh token");
        }
    };

    createAccess = async (payload: IAccess) => {
        const access: any = this.config.get<string>("JWT_ACCESS_KEY");
        const token = sign(payload, access, { expiresIn: "0.5h" });
        await this.redis.setSessionValue('access', payload.id, token, 3600 * 0.5);
        return token;
    };

    createRefresh = async (payload: IRefresh) => {
        const access: any = this.config.get<string>("JWT_REFRESH_KEY");
        const token = sign(payload, access, { expiresIn: "0.7h" });
        await this.redis.setSessionValue(
            'refresh',
            payload.id,
            token,
            3600 * 0.7,
          );
        return token;
    };

    signToken = async (payload: any): Promise<ResponseSign>  => {
        const secret = this.config.get<string>("JWT_SIGN_KEY");
        if (!secret) throw new NotFoundException("Secret not Found");
        const token = await this.createAccess({id: payload.user_id})
        const refreshToken = await this.createRefresh({id: payload.user_id});
        return {access_token: token, refresh_token: refreshToken};
    };
}
