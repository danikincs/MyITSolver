import { TokenService } from "../service/tokenService";


export class TokenController {
    static create(req: { body: any; }, res: any, next: any) {
        TokenService.create(req, res, next)
    }

    static renew(req: { body: any; }, res: any, next: any) {
        TokenService.renew(req, res, next)
    }
  }