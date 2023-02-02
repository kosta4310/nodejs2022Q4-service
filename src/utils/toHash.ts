const bcrypt = require('bcrypt');

export async function toHash(myPlaintextPassword: string): Promise<string> {
  return await new Promise((res, rej) => {
      bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
      if (err) {
        rej('error bcrypt')
      }
      res(hash);
    });
    })
  
  
}