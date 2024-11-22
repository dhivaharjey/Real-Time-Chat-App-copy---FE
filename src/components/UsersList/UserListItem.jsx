import { Avatar, background, Box, Stack, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { ChatState } from "../Context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  // const { user } = ChatState();
  console.log("userList item");

  return (
    <>
      <Box
        onClick={handleFunction}
        curser="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        width="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user?.name}
          src={user?.picture}
        />
        <Box>
          <Text>{user?.name}</Text>
          <Text fontSize="xs">
            <b>Email :</b>
            {user?.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default memo(UserListItem);
