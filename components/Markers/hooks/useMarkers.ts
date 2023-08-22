import { useEffect, useState } from 'react';

import { API_BASE } from '@/utils/consts';
import { buildApiUrl } from '@/utils/helpers';
import { Marker } from '@/utils/types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { MARKER_PAGE_SIZE } from '../consts';

type MarkerResponse = {
  page: number;
  markers: Marker[];
};

// Flattens the pages into a single array of markers.
const select = (data: InfiniteData<MarkerResponse>) =>
  data.pages.flatMap(({ markers }) => markers);

/**
 * Custom API hook to fetch markers from the API. Can handle both filtered and
 * unfiltered requests.
 *
 * We don't have a way to get the total number of markers from the API, so we
 * have to rely on the fact that the API will return a smaller total when we've
 * reached the last page.
 *
 * There are edge cases where we end up with page requests beyond the last page,
 * but as this just returns an empty array it's not too much of an issue. Too
 * many incidents of this might result in memory issues but this is an extreme
 * edge case.
 */
export const useMarkers = ({
  nameSearch,
  onError,
}: {
  nameSearch?: string;
  onError: () => void;
}) => {
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    setReachedEnd(false);
  }, [nameSearch]);

  return useInfiniteQuery<MarkerResponse, Error, Marker[]>({
    queryKey: ["markers", nameSearch],
    enabled: !reachedEnd,
    // We can assume that the markers will not change over the course of a session,
    // so we can cache them.
    staleTime: Infinity,
    queryFn: ({ pageParam = 1 }) => {
      return fetch(
        buildApiUrl("api/markers", { pageParam, name: nameSearch }, API_BASE)
      )
        .then((res) => res.json())
        .then(({ total, ...res }) => {
          if (total < MARKER_PAGE_SIZE) {
            setReachedEnd(true);
          }

          return { total, ...res };
        })
        .catch(onError);
    },
    select,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
};
