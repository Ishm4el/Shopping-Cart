import { useEffect, useState } from "react";
import fetchGet from "../utility/fetchGet";

export default function useFetchGet({
  link,
  setter,
}: {
  link: string;
  setter: React.Dispatch<any>;
}) {
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    fetchGet(link)
      .then((res) => res.json())
      .then((resJson) => setter(resJson))
      .catch(() => setError(true));
  }, []);
  return error;
}
