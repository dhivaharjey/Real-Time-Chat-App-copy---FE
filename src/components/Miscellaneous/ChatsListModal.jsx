import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { ChatState } from "../Context/ChatProvider";
import NotificationBadge, { Effect } from "react-notification-badge";
const ChatsListModal = ({ user, notify }) => {
  console.log("chatlistmodal");

  // const newMsg = notify[notify.length - 1]?.content;

  return (
    <>
      <Box display="flex" flexDir="column">
        <Box display="flex" alignItems="center">
          <Avatar
            // borderRadius="full"
            size="sm"
            src={user?.picture}
            boxShadow="dark-lg"
            alt={user?.name}
          />
          <Text px={4}>{user?.name}</Text>
        </Box>

        {/* <Box
          display="flex"
          marginLeft="50px"
          fontSize="small"
          fontWeight="light"
        >
          {newMsg ? (
            <>
              <Text>New :</Text>
              <Text px={2}>{notify[notify.length - 1]?.content}</Text>{" "}
            </>
          ) : null}
        </Box> */}
        <Box position="absolute" right="1px" top="10px" px={1}>
          <NotificationBadge count={notify?.length} effect={Effect.SCALE} />
        </Box>
      </Box>
    </>
  );
};

export default memo(ChatsListModal);
