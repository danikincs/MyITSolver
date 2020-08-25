import express from 'express';
const router = express.Router();
import {auth} from "../middleware/auth";

import { TokenService } from "../service/tokenService";

router.get('/create', function (req, res, next) {
  TokenService.create(req, res, next);
})

router.post('/renew', auth, function (req, res, next) {
  TokenService.renew(req, res, next);
})

router.post('/update', auth, function (req, res, next) {
  TokenService.update(req, res, next);
})

export default router;