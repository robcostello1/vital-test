import { COLLECTION_METHODS_MAP } from '@/utils/consts';
import { Panel } from '@/utils/types';
import { EditIcon } from '@chakra-ui/icons';
import {
    Badge, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Spacer, Text
} from '@chakra-ui/react';

type PanelCardProps = Panel;

const PanelCard = ({ name, markers, collectionMethod }: PanelCardProps) => {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Flex alignItems="flex-start" width={"100%"} overflow="hidden">
          <Box overflow="hidden">
            <Heading size={"sm"}>{name}</Heading>
            <Text color="gray.500">
              {COLLECTION_METHODS_MAP[collectionMethod]}
            </Text>
          </Box>
          <Spacer />
          <IconButton
            mt={-1}
            mr={-1}
            onClick={() =>
              alert("Editing and deletion of Panels not implemented yet")
            }
            size="sm"
            variant="ghost"
            aria-label="Edit"
            icon={<EditIcon />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        {markers.map(({ name, slug }) => (
          <Badge key={slug} mr={2}>
            {name}
          </Badge>
        ))}
      </CardBody>
    </Card>
  );
};

export default PanelCard;
