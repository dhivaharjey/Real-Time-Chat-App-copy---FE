import { Avatar, Box, Text, Badge } from "@chakra-ui/react";
import React, { memo } from "react";
import { ChatState } from "../Context/ChatProvider";

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
          {notify?.length > 0 ? (
            <Badge
              paddingInline="6px"
              position="absolute"
              right="1px"
              top="0px"
              borderRadius="full"
              color="whiteAlpha.900"
              bgColor="red.500"
            >
              {notify?.length}
            </Badge>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default memo(ChatsListModal);
