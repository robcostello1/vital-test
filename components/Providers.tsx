"use client";

// @ts-expect-error
import { MultiSelectTheme } from 'chakra-multiselect';
import { ReactNode } from 'react';

import { queryClient } from '@/utils/queryClient';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,

    Button: {
      variants: {
        solid: (props: StyleFunctionProps) => {
          return {
            bg: props.colorMode === "dark" ? "white" : "black",
            color: props.colorMode === "dark" ? "black" : "white",
            _hover: {
              bg: props.colorMode === "dark" ? "gray.400" : "#075144",
            },
          };
        },
      },
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
