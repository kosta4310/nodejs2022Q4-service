import {hash} from 'bcrypt';

export async function toHash(myPlaintextPassword: string): Promise<string> {
  return await new Promise((res, rej) => {
    hash(myPlaintextPassword, 10, function (err, hash) {
      if (err) {
        rej('error bcrypt');
      }
      res(hash);
    });
  });
}
