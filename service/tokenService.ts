import jwt from "jsonwebtoken";
import {getConnectionManager} from "typeorm";
import {Token} from "../models/token";
import { ErrorHandler } from "../models/Error";
import { Article } from "../models/article";

export class TokenService {

    //Create new token, send token back
    static create(req: any, res: any, next: any) {
        try {
            let platformtype = req.query.platformtype;
            if(!platformtype) {
                throw new ErrorHandler(404, "Missing parameter platformType");
            }
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
            }).catch(err => {
                next(err)
            })
        }catch(err) {
            next(err)
        }
    }

    //Update new token in database, send back to user
    static async renew(req: any, res: any, next: any) {

        try {
            const inputToken = (req.body && req.body.token) || (req.query && req.query.token);
            if(!(req.body && req.body.token) || (req.query && req.query.token)) {
                throw new ErrorHandler(404, "Token not provided")
            }
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
            await tokensRepository.save(oldToken).then(result => console.log("token saved", result));

            return res.status(200).json({
                message: "Token renew success.",
                token: oldToken
            });
        }catch(err) {
            next(err)
        }
    }

    //Update token usage count in Articecontroller
    static async update(req: any, res: any, next: any, article:Array<Article>) {
        try {
            const inputToken = (req.body && req.body.token) || (req.query && req.query.token);
            //Get token from DB
            const tokensRepository = getConnectionManager().get("default").getRepository(Token);
            let token = await tokensRepository.findOne({where: { token: inputToken }});  
            if(!token) {
                throw new ErrorHandler(404, "Can't find token")
            }  
            if(token.usage > token.maxUsage) {
               throw new ErrorHandler(401, "Token usage limit reached. Please renew")
            }else {
                token.usage++;
                await tokensRepository.save(token);
                res.send(article)
            }
        }catch(err) {
            next(err)
        }
    }
}