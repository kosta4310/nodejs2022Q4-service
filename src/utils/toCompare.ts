const bcrypt = require('bcrypt');

export async function toCompare(myPlaintextPassword: string, hash: string): Promise<boolean> {
  return await new Promise((res, rej) => {
      bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        if (err) {
          rej('error bcrypt')
        }
        res(result)
      });
    })
  
  
}