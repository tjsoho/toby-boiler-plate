import "next-auth";
import type { User } from "../libs/database/types";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
