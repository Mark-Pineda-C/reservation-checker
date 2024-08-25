"use client";

import { SheetProvider } from '@/context/sheet-provider';
import {NextUIProvider} from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ThemeProvider as NextThemesProvider} from "next-themes";

const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <SheetProvider>{children}</SheetProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}