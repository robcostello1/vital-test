import { MultiValue, Select } from 'chakra-react-select';
import { memo, useCallback, useState } from 'react';
import { useDebounce } from 'react-use';

import { useMarkers } from '@/components/Markers';
import { DEFAULT_MARKERS_SEARCH_STRATEGY } from '@/utils/consts';
import { Marker } from '@/utils/types';
import { Flex, Spacer, Spinner, Text } from '@chakra-ui/react';

import styles from './MarkersSelect.module.css';
import { MarkerOption } from './types';
import { getMarkerSelectValue, noopFilter } from './utils';

const DEFAULT_OPTIONS: Marker[] = [];

export type MarkersSelectProps = {
  id: string;
  values: Marker[];
  searchStrategy?: "local" | "remote";
  onChange: (values: Marker[]) => void;
  // TODO provide information on cause of API error
  onError: () => void;
};

/**
 * Multiselect for picking markers.
 *
 * Per task description, filtering is done locally. However this results in incomplete results
 * if the user has not scrolled to the bottom of the list. I've implemented a "remote" search
 * option for better results.
 */
const MarkersSelect = ({
  id,
  values,
  searchStrategy = DEFAULT_MARKERS_SEARCH_STRATEGY,
  onChange,
  onError,
}: MarkersSelectProps) => {
  const [search, setSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  useDebounce(() => setNameSearch(search), 500, [search]);

  // Allows for browsing and searching by switching between cached unfiltered and name search requests
  const { data, isFetching, isError, fetchNextPage } = useMarkers({
    nameSearch: searchStrategy === "remote" ? nameSearch : undefined,
    onError,
  });

  const options = data || DEFAULT_OPTIONS;

  const handleChange = useCallback(
    (selected: MultiValue<MarkerOption>) => {
      onChange(
        data!.filter(({ id }) =>
          selected.map(({ value }) => value).includes(id)
        )
      );
    },
    [data, onChange]
  );

  const handleReachBottom = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderNoOptions = useCallback(
    () =>
      !options.length && isFetching ? (
        <Spinner size="sm" />
      ) : (
        "No markers found"
      ),
    [isFetching, options.length]
  );

  const renderOptionLabel = useCallback(
    ({ label, type, unit }: MarkerOption) => (
      <span style={{ whiteSpace: "normal", width: "100%" }}>
        <Flex>
          <Text>{label}</Text>
          <Spacer w={1} />
          {type || unit ? (
            <Text color="gray.400">
              {type}
              {type && unit ? " - " : null}
              {unit}
            </Text>
          ) : null}
        </Flex>
      </span>
    ),
    []
  );

  return (
    <Select
      isMulti
      inputId={id}
      isDisabled={isError}
      className={styles.root}
      filterOption={searchStrategy === "remote" ? noopFilter : undefined}
      defaultValue={values.map(getMarkerSelectValue)}
      options={options.map(getMarkerSelectValue)}
      noOptionsMessage={renderNoOptions}
      onInputChange={setSearch}
      formatOptionLabel={renderOptionLabel}
      onChange={handleChange}
      onMenuScrollToBottom={handleReachBottom}
    />
  );
};

export default memo(MarkersSelect) as typeof MarkersSelect;
