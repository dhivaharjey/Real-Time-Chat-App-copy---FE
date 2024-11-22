import { Avatar, Box, Text, Badge } from "@chakra-ui/react";
import React, { memo } from "react";

const GroupChatDisplay = ({ chat, notify }) => {
  console.log("GroupChatDisplay");
  console.log(notify);

  return (
    <Box display="flex" alignItems="center">
      <Avatar name={chat?.chatName} size="sm" />
      <Text ml="15px">{chat?.chatName}</Text>
      <Box display="flex" flexDir="column">
        {notify?.length > 0 ? (
          <Badge
            paddingInline="6px"
            position="absolute"
            right="3px"
            top="-1px"
            borderRadius="full"
            color="whiteAlpha.900"
            bgColor="red.500"
          >
            {notify?.length}
          </Badge>
        ) : null}

        <Box
          position="absolute"
          bottom="-2px"
          right="1px"
          px={1}
          borderRadius="2xl"
          bg="orange.200"
          fontSize="xx-small"
          color="blackAlpha.800"
        >
          Group
        </Box>
      </Box>
    </Box>
  );
};

export default memo(GroupChatDisplay);
