import { Marker } from '@/utils/types';

import { MarkerOption } from './types';

export const getMarkerSelectValue = ({
  name,
  id,
  type,
  unit,
}: Marker): MarkerOption => ({
  value: id,
  label: name,
  type,
  unit,
});

export const noopFilter = () => true;
