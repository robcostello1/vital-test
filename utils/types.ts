export type Marker = {
  description: string;
  id: number;
  lab_id: number;
  name: string;
  price: string;
  provider_id: string;
  slug: string;
  type: string | null;
  unit: string | null;
};

export type CollectionMethod = "test_kit" | "at_home_phlebotomy";

export type Panel = {
  name: string;
  markers: Marker[];
  collectionMethod: CollectionMethod;
};
