"use client";
import { trpc } from "@/trpc/client";
export default function Home() {
  const { data } = trpc.greeting.useQuery({ text: "fateeen nisar" });
  const utils = trpc.useUtils();
  return <h1>hello</h1>;
}
