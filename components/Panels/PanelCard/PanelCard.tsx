import { COLLECTION_METHODS } from '@/utils/consts';
import { Panel } from '@/utils/types';
import { EditIcon } from '@chakra-ui/icons';
import {
    Badge, Card, CardBody, CardHeader, Flex, Heading, IconButton, Spacer, Text
} from '@chakra-ui/react';

type PanelCardProps = Panel;

const PanelCard = ({ name, markers, collectionMethod }: PanelCardProps) => {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Flex alignItems="flex-start" width={"100%"}>
          <div>
            <Heading size={"sm"}>{name}</Heading>
            <Text color="gray.500">
              {
                // TODO messy
                COLLECTION_METHODS.find(
                  ({ value }) => value === collectionMethod
                )?.label
              }
            </Text>
          </div>
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
        {markers.map(({ name }, index) => (
          <Badge key={index} mr={2}>
            {name}
          </Badge>
        ))}
      </CardBody>
    </Card>
  );
};

export default PanelCard;
