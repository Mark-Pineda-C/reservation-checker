"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export type SheetContextProps = {
  apartment: string;
  name: string;
  zone: string;
  date: string;
  startHour?: string;
  endHour?: string;
  totalTime?: string;
  tower?: string;
};

export const SheetsContext = createContext<SheetContextProps[]>([]);

export const SheetProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { data } = useQuery({
    queryKey: ["sheets"],
    queryFn: async () => {
      const response = await fetch("/api/sheet-fetcher");
      return (await response.json()) as SheetContextProps[];
    },
    refetchInterval: 1000 * 60 * 5,
  });

  if (!data) {
    return null;
  }

  return (
    <SheetsContext.Provider value={data}>{children}</SheetsContext.Provider>
  );
};

export const useSheets = () => useContext(SheetsContext);
