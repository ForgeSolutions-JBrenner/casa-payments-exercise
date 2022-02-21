import bcrypt from "bcrypt";

export const hashPass = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    }); //standard strength of 12 in the has algo
  });
};

//check and compare passwords
export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
