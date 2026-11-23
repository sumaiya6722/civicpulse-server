import { hashPassword } from "@better-auth/utils/password";
declare const hashPassword$1: typeof hashPassword;
declare const verifyPassword$1: ({ hash, password }: {
  hash: string;
  password: string;
}) => Promise<boolean>;
export { hashPassword$1 as hashPassword, verifyPassword$1 as verifyPassword };