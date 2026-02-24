import { useState, useCallback, useEffect } from "react";
import { fetchUsage } from "../api";

export default function useCredits() {
  const [balance, setBalance] = useState("--");

  const refresh = useCallback(async () => {
    setBalance(await fetchUsage());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, refresh };
}
