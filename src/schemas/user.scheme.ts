import { z } from "zod";

const UserSchema = z.object({
  _id: z.string(),
  firstname: z.string().min(3).max(15),
  lastname: z.string().min(3).max(15),
  document: z.string().trim(),
  password: z.string().min(8),
  access: z.enum(["admin", "student", "teacher"]),
  createdAt: z.date(),
  updatedAt: z.date()
});

type IUser = z.infer<typeof UserSchema>;
type IUserAuth = Pick<IUser, "document" | "password">
export {
  UserSchema,
  IUser,
  IUserAuth
}