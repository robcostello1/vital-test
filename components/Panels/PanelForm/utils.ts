import { Panel } from '@/utils/types';

export const validates = (values: Partial<Panel>): values is Panel => {
  if (!values.name || !values.markers?.length || !values.collectionMethod) {
    return false;
  }
  return true;
};

export const getErrors = (values: Partial<Panel>) => {
  const errors: Partial<Record<keyof Panel, string>> = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.markers?.length) {
    errors.markers = "At least one marker is required";
  }
  if (!values.collectionMethod) {
    errors.collectionMethod = "Collection method is required";
  }

  return errors;
};
