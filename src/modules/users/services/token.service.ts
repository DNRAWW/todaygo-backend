import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from "jsonwebtoken";
import { JwtTokenDto } from "../DTO/jwtToken.dto";

@Injectable()
export class TokenService {
    @Inject(ConfigService)
    private readonly configService: ConfigService;

    verifyToken(token: string): JwtTokenDto {
        try {
            return <JwtTokenDto>jwt.verify(token, this.configService.get("secret_key"), {
                algorithms: ["RS256"],
            });
        } catch {
            throw Error("403");
        }
    }

    genToken(id: number): string {
        return jwt.sign({userId: id}, this.configService.get("secret_key"), {
            algorithm: "RS256",
        });
    }
}