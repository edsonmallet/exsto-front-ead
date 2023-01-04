import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import React from "react";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri: process.env.API_URL }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState = {}) {
  const store = React.useMemo(
    () => initializeApollo(initialState),
    [initialState]
  );
  return store;
}
