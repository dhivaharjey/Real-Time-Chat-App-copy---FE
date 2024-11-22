import { Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <>
      <Stack>
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Text>Hiiiiiii</Text>
      </Stack>
    </>
  );
};

export default ChatLoading;
