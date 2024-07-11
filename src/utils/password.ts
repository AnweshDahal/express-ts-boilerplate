import bcrypt from 'bcrypt';

export const encrypt = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const compare = (text: string, hash: string): boolean => {
  return bcrypt.compareSync(text, hash);
};
