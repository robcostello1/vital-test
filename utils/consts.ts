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

export const DEFAULT_MARKERS_SEARCH_STRATEGY = "remote"; // Update to  "remote" for server-side search
