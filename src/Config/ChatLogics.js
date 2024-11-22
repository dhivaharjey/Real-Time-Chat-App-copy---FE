export const getSender = (loggedUser, users) => {
  // console.log("get fn", loggedUser._id, users[0]._id, users[1]._id);

  if (!loggedUser || !users) return null; // Ensure both are defined
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFullDetail = (loggedUser, users) => {
  if (!loggedUser || !users) return null; // Ensure both are defined
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
// export const isSameSender = (messages, msg, i, userId) => {
//   return (
//     i < messages.length - 1 && // Check that we’re not on the last message
//     (messages[i + 1].sender?._id !== msg?.sender?._id || // Check if the next message is from a different sender
//       messages[i + 1].sender?._id !== undefined) && // Ensure the next message's sender is defined
//     messages[i].sender?._id !== userId // Check if the current message's sender is not the logged-in user

//   );
// };
export const isSameSender = (messages, msg, i, userId) => {
  return (
    i < messages.length - 1 && // Ensure it’s not the last message
    messages[i + 1].sender?._id !== msg.sender?._id && // Check that the next message is from a different sender
    msg.sender?._id !== userId // Ensure the current message is from the opposite sender
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 && // Check if it's the last message in the array
    messages[messages.length - 1].sender?._id !== userId && // Ensure it's not sent by the logged-in user
    messages[messages.length - 1].sender?._id // Ensure the sender exists
  );
};

// export const isSameSenderMargin = (messages, msg, i, userId) => {
//   const conditionOne =
//     i < messages.length - 1 &&
//     messages[i + 1]?.sender?._id === msg?.sender?._id &&
//     messages[i].sender?._id !== userId;
//   const conditionTwo =
//     (i < messages.length - 1 &&
//       messages[i + 1]?.sender?._id !== msg?.sender?._id &&
//       messages[i]?.sender?._id !== userId) ||
//     (i === messages.length - 1 &&
//       messages[messages.length - 1]?.sender?._id !== userId);
//   if (conditionOne) {
//     return 33;
//   } else if (conditionTwo) {
//     return 0;
//   } else {
//     return "auto";
//   }
// };
export const isSameSenderMargin = (messages, msg, i, userId) => {
  // Check if the next message is from the same sender
  const isSameSenderNext =
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === msg?.sender?._id;

  // Check if the message is from the logged-in user
  const isFromLoggedInUser = msg.sender?._id === userId;

  // If the current message is from a different sender than the previous, return no margin
  if (!isSameSenderNext && !isFromLoggedInUser) {
    return "0px";
  }

  // If consecutive messages from the same sender and not from logged-in user, add minimal margin
  if (isSameSenderNext && !isFromLoggedInUser) {
    return "33px";
  }

  // Auto margin for messages from the logged-in user
  return "auto";
};

export const isSameUser = (messages, msg, i) => {
  return i > 0 && messages[i - 1].sender._id === msg.sender._id;
};
