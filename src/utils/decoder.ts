import jsonwebtoken from 'jsonwebtoken';

// Decodes a token for id
export default function decoder(token: string) {
  const fallbackRegex = /Bearer /g;

  if (token && fallbackRegex.test(token)) {
    token = token.slice(7, token.length);
  }

  let decoded = { id: null };

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded_: any) => {
      if (err) {
        throw 500;
      }
      decoded = decoded_;
    },
  );

  return decoded.id;
}
