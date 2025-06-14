const API_URL = import.meta.env.VITE_APP_API_URL;

export default function fetchGet(link: string) {
  const url = API_URL + link;
  return fetch(url, {
    method: "Get",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
}
