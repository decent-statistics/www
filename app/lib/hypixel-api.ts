import { Client } from "hypixel-api-reborn";
import { data } from "react-router";

if (!process.env.HYPIXEL_API_KEY) {
  throw data("no api key");
}

export const hypixel = new Client(process.env.HYPIXEL_API_KEY, { cache: true });
