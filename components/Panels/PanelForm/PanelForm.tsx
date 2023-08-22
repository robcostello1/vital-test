import { FormEvent, useCallback, useState } from 'react';

import { MarkersSelect } from '@/components/Markers';
import { COLLECTION_METHODS } from '@/utils/consts';
import { CollectionMethod, Marker, Panel } from '@/utils/types';
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Select, Stack
} from '@chakra-ui/react';

import styles from './PanelForm.module.css';
import { getErrors, validates } from './utils';

type PanelFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Panel) => void;
};

// TODO "edit" implementation
/**
 * Form for creating a new Panel.
 */
const PanelForm = ({ isOpen, onClose, onSubmit }: PanelFormProps) => {
  // Would use Formik or similar when form complexity increases
  const [name, setName] = useState("");
  const [selectedMarkers, setSelectedMarkers] = useState<Marker[]>([]);
  const [collectionMethod, setCollectionMethod] = useState<CollectionMethod>();
  const [errors, setErrors] = useState<Partial<Record<keyof Panel, string>>>(
    {}
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const values = { name, markers: selectedMarkers, collectionMethod };
      if (validates(values)) {
        setErrors({});
        onSubmit(values);
        onClose();
      } else {
        setErrors(getErrors(values));
      }
    },
    [name, selectedMarkers, collectionMethod, onClose, onSubmit]
  );

  const handleMarkerApiError = useCallback(() => {
    setErrors({ markers: "Error fetching markers. Please try again later." });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ModalHeader>Create your panel</ModalHeader>
          <ModalBody>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={({ target: { value } }) => setName(value)}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.markers}>
                <FormLabel htmlFor="markers">Biomarkers</FormLabel>
                <MarkersSelect
                  id="markers"
                  values={selectedMarkers}
                  onChange={setSelectedMarkers}
                  onError={handleMarkerApiError}
                />
                {errors.markers && (
                  <FormErrorMessage>{errors.markers}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.collectionMethod}>
                <FormLabel>Collection method</FormLabel>
                <Select
                  defaultValue={""}
                  value={collectionMethod}
                  onChange={({ target: { value } }) =>
                    setCollectionMethod(value as CollectionMethod)
                  }
                  placeholder="Select..."
                >
                  {COLLECTION_METHODS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                {errors.collectionMethod && (
                  <FormErrorMessage>{errors.collectionMethod}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<CloseIcon boxSize={3} />}
              colorScheme="red"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PanelForm;
