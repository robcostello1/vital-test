"use client";

import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { Panel } from '@/utils/types';
import { AddIcon } from '@chakra-ui/icons';
import {
    Box, Button, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Spacer, VStack
} from '@chakra-ui/react';

import PanelCard from './PanelCard/PanelCard';
import PanelForm from './PanelForm/PanelForm';

// TODO panel editing not completed yet but it would be straigtforward to pass the selected
// panel to the form to prepopulate the fields.
// TODO The whole marker object is currently stored but we could probably cut that down to
// just the id if we prefech the marker list.
/**
 * View and create panels. Created panels are stored in local storage.
 */
const Panels = () => {
  const [panels, setPanels] = useLocalStorage<Panel[]>("panels", []);
  const [isCreatePanelModalOpen, setIsCreatePanelModalOpen] = useState(false);

  const handleSubmit = useCallback(
    (panel: Panel) => {
      setPanels((currentPanels = []) => [...currentPanels, panel]);
    },
    [setPanels]
  );

  // Clear the form after it's closed (including the animation)
  const [formVersion, setFormVersion] = useState(0);
  useEffect(() => {
    if (!isCreatePanelModalOpen) {
      setTimeout(
        () => setFormVersion((currentVersion) => currentVersion + 1),
        100
      );
    }
  }, [isCreatePanelModalOpen]);

  return (
    <Box minHeight="100vh" bg="gray.100">
      <VStack
        py={10}
        px={10}
        height={"100vh"}
        spacing={10}
        alignItems={"flex-start"}
      >
        <Card variant="outline" p={5}>
          <CardHeader pb={0}>
            <Flex width={"100%"}>
              <Heading size={"md"}>Your Panels</Heading>
              <Spacer />
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setIsCreatePanelModalOpen(true)}
              >
                Create new panel
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={[1, null, 2, null, 4]} spacing="40px">
              {!panels || panels.length === 0 ? (
                <>You have not created any panels yet.</>
              ) : (
                panels.map((panel, index) => (
                  <PanelCard key={index} {...panel} />
                ))
              )}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>

      <PanelForm
        key={formVersion}
        isOpen={isCreatePanelModalOpen}
        onClose={() => setIsCreatePanelModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Panels;
