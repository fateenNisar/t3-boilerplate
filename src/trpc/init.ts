import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { auth } from "../server/auth";
import { Session } from "next-auth";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth();
  return { session };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(async ({ctx,next}) => {
  if (!ctx.session) {
    throw new TRPCError({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }
  return next({
    ctx:{
      session:ctx.session
    }
  })
});
