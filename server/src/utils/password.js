import bcrypt from "bcryptjs";

export const hash = (txt) => bcrypt.hashSync(txt, 10);
export const verify = (txt, hashTxt) => bcrypt.compareSync(txt, hashTxt);
