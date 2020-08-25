import jwt from "jsonwebtoken";
import {getConnectionManager} from "typeorm";
import {Token} from "../models/token";

export class TokenService {

    //Create new token, send token back
    static create(req: any, res: any, next: any) {
        let platformtype = req.query.platformtype;
        let token = new Token();
        token.token = jwt.sign(
            {
                random: 0
            },
            process.env.JWT_KEY,
          );
        token.usage = 0;
        token.maxUsage = 5;
        token.platformType = platformtype;
        
        getConnectionManager().get("default").manager.save(token).then((token) => {
            res.status(200).json({
                message: "Successfully created token.",
                token: token
              });
        })
    }

    //Update new token in database, send back to user
    static async renew(req: any, res: any, next: any) {

        const inputToken = (req.body && req.body.token) || (req.query && req.query.token);
        const tokensRepository = getConnectionManager().get("default").getRepository(Token);
        let oldToken = await tokensRepository.findOne({where: { token: inputToken }});     

        const newToken = jwt.sign(
            {
                random: 0
            },
            process.env.JWT_KEY,
        );

        oldToken.token = newToken;
        oldToken.usage = 0;

        return res.status(200).json({
            message: "Token renew success.",
            token: oldToken
        });
    }

    //Update token usage count in Articecontroller
    static async update(req: any, res: any, next: any) {
        const inputToken = (req.body && req.body.token) || (req.query && req.query.token);
        //Get token from DB
        const tokensRepository = getConnectionManager().get("default").getRepository(Token);
        let token = await tokensRepository.findOne({where: { token: inputToken }});     

        if(token.usage >= token.maxUsage) {
            res.status(401).send({
                message:"Token expired, please renew"
            })
        }else {
            token.usage++;
            await tokensRepository.save(token);
        }
    }
}