import { expressjwt, GetVerificationKey } from 'express-jwt';
import JwksRsa from 'jwks-rsa';

export const jwtCheck = expressjwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`,
  }) as GetVerificationKey,
  algorithms: ['RS256'],
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
});
