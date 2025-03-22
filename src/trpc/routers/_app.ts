import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  greeting:publicProcedure 
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        message: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;