import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React, { memo } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics.js";
import { ChatState } from "./Context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import "./UsersList/SingleChats/Style.css";
const MessageContent = ({ messages }) => {
  const { user } = ChatState();
  // console.log("user", user);
  console.log("msg content page");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-IN", options); // Adjust options for your locale if needed
  };
  // console.log(messages);
  let lastTimestamp = null;
  return (
    <ScrollableFeed className="messages">
      {messages &&
        messages?.map((msg, index) => {
          return (
            <div key={msg._id}>
              {index > 0 &&
                Math.abs(new Date(msg.createdAt).getTime() - lastTimestamp) >
                  1800000 && (
                  <span
                    // key={msg._id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      // marginLeft: isSameSenderMargin(
                      //   messages,
                      //   msg,
                      //   index,
                      //   user._id
                      // ),

                      // marginTop: isSameUser(messages, msg, index, user._id)
                      //   ? 3
                      //   : 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "gray",
                      }}
                    >
                      {/* {formatDate(messages[index - 1].updatedAt)} */}
                      {formatDate(msg.createdAt)}
                    </span>
                  </span>
                )}

              {/* {(lastTimestamp = new Date(msg.createdAt).getTime())} */}
              <div style={{ display: "none" }}>
                {index > 0 &&
                  Math.abs(new Date(msg.createdAt).getTime() - lastTimestamp) >
                    1800000 &&
                  (lastTimestamp = new Date(msg.createdAt).getTime())}
              </div>
              <div style={{ display: "flex" }}>
                {(isSameSender(messages, msg, index, user?._id) ||
                  isLastMessage(messages, index, user._id)) && (
                  <Tooltip
                    label={msg?.sender?.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      border="1px solid grey"
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={msg.sender?.name}
                      src={msg.sender?.picture}
                    />
                  </Tooltip>
                )}
                {/* <div style={{ display: "flex" }}> */}

                {/* </div> */}
                <span
                  style={{
                    backgroundColor: `${
                      msg.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    marginLeft: isSameSenderMargin(
                      messages,
                      msg,
                      index,
                      user._id
                    ),
                    // marginTop: "3px",
                    marginTop: isSameUser(messages, msg, index, user._id)
                      ? 3
                      : 10,
                  }}
                >
                  {msg?.content}
                </span>
              </div>
            </div>
          );
        })}

      {/* {(lastTimestamp = new Date(msg.createdAt).getTime())} */}
    </ScrollableFeed>
  );
};

export default memo(MessageContent);
// <ScrollableFeed className="messages">
//   {messages &&
//     messages.map((msg, index) => {
//       const showTimestamp =
//         index === 0 || // Always show the timestamp for the first message
//         Math.abs(
//           new Date(msg.createdAt).getTime() -
//             new Date(messages[index - 1].createdAt).getTime()
//         ) > 1800000; // Show if more than 30 minutes since the previous message

//       return (
//         <div key={msg._id}>
//           {showTimestamp && (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 margin: "10px 0",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: "12px",
//                   color: "gray",
//                 }}
//               >
//                 {formatDate(msg.createdAt)}
//               </span>
//             </div>
//           )}
//           <div style={{ display: "flex" }}>
//             {(isSameSender(messages, msg, index, user?._id) ||
//               isLastMessage(messages, index, user._id)) && (
//               <Tooltip
//                 label={msg?.sender?.name}
//                 placement="bottom-start"
//                 hasArrow
//               >
//                 <Avatar
//                   border="1px solid grey"
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={msg.sender?.name}
//                   src={msg.sender?.picture}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   msg.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//                 marginLeft: isSameSenderMargin(
//                   messages,
//                   msg,
//                   index,
//                   user._id
//                 ),
//                 marginTop: isSameUser(messages, msg, index, user._id)
//                   ? 3
//                   : 10,
//               }}
//             >
//               {msg?.content}
//             </span>
//           </div>
//         </div>
//       );
//     })}
// </ScrollableFeed>
{
  /* {messages &&
        messages.map((msg, index) => {
          // Check if avatar should be visible
          const isAvatarVisible =
            isSameSender(messages, msg, index, user._id) ||
            isLastMessage(messages, index, user._id);

          return (
            <div style={{ display: "flex" }} key={msg?._id}>
              {isAvatarVisible && (
                <Tooltip
                  label={msg?.sender?.name}
                  placement="bottom-start"
                  hasArrow
                  key={`${msg?._id}-tooltip`}
                >
                  <Avatar
                    border="1px solid grey"
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={msg.sender?.name}
                    src={msg.sender?.picture}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    msg?.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(
                    messages,
                    msg,
                    index,
                    user._id
                  ),
                  marginTop: "3px",
                }}
              >
                {msg?.content}
              </span>
            </div>
          );
        })} */
}
