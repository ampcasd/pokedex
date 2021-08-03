import { Url } from "../services/search.service";

export function pokemonIdFromUrl(url: Url): string {
  console.log(url.split("/").pop())

  return url.split("/").pop();
}
