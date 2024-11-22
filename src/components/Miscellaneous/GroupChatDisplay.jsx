import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
const GroupChatDisplay = ({ chat, notify }) => {
  console.log("GroupChatDisplay");

  return (
    <Box display="flex" alignItems="center">
      <Avatar name={chat?.chatName} size="sm" />
      <Text ml="15px">{chat?.chatName}</Text>
      <Box display="flex" flexDir="column">
        <Box position="absolute" top="1px" right="7px">
          <NotificationBadge count={notify?.length} effect={Effect.SCALE} />
        </Box>
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
