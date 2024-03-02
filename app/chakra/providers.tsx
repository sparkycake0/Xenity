"use client";
import UserCheck from "../lib/userchecking";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <UserCheck>{children}</UserCheck>
    </ChakraProvider>
  );
}
