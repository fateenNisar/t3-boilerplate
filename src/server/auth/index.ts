import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import { db } from "../db"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db)
})