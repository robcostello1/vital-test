import { CollectionMethod } from './types';

export const API_BASE = `${window.location.protocol}//${
  window.location.hostname
}${window.location.port ? `:${window.location.port}` : ""}`;

export const COLLECTION_METHODS: {
  value: CollectionMethod;
  label: string;
}[] = [
  { value: "test_kit", label: "Test kit" },
  { value: "at_home_phlebotomy", label: "At home phlebotomy" },
];

export const COLLECTION_METHODS_MAP = COLLECTION_METHODS.reduce<
  Record<CollectionMethod, string>
>((acc, { value, label }) => {
  acc[value] = label;
  return acc;
}, {} as Record<CollectionMethod, string>);

export const DEFAULT_MARKERS_SEARCH_STRATEGY: "local" | "remote" = "local"; // Update to  "remote" for server-side search
