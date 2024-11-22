import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  });
  const [selectedChat, setSelectedChat] = useState("");
  const [chats, setChats] = useState();
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const res = await axios.get("/api/user/check-auth", config);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("selectedChatId");
      }
    }
  };
  useEffect(() => {
    if (user) validateToken();
  }, [user, selectedChat, chats, fetchChatsAgain]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo);
    } else if (
      !userInfo &&
      user?.token &&
      window.location.pathname !== "/reset-password/:token"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  useEffect(() => {
    const savedChatId = localStorage.getItem("selectedChatId");
    console.log(savedChatId);

    if (savedChatId && chats) {
      const selected = chats?.find((chat) => chat._id === savedChatId);

      setSelectedChat(selected);
    }
  }, [chats, selectedChat]);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  // useEffect(() => {
  //   api.interceptors.request.use(
  //     (config) => {
  //       if (
  //         user?.token &&
  //         window.location.pathname !== "/reset-password/:token"
  //       ) {
  //         const decodedToken = jwtDecode(user.token);
  //         const currentTime = Date.now() / 1000;
  //         if (decodedToken?.exp < currentTime) {
  //           setUser(null);
  //           localStorage.removeItem("userInfo");
  //           toast({
  //             title: "Session Expired",
  //             description: "Please log in again.",
  //             status: "error",
  //             duration: 5000,
  //             isClosable: true,
  //             position: "top-right",
  //           });
  //           navigate("/");
  //         } else {
  //           config.headers["Authorization"] = `Bearer ${user?.token}`;
  //         }
  //       }
  //       return;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   return () => {
  //     api.interceptors.request.eject(api.interceptors.request);
  //   };
  // }, [user]);

  // console.log("provider", user);
  // console.log("selectedChat from provider", selectedChat);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchChatsAgain,
        setFetchChatsAgain,
        notification,
        setNotification,
        api,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
// import { useToast } from "@chakra-ui/react";
// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SessionLogOut from "./SessionLogOut";

// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [selectedChat, setSelectedChat] = useState();
//   const [chats, setChats] = useState();
//   const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
//   const [userSession, setUserSession] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();

//   const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
//   });

//   // Handle response errors with an interceptor
//   useEffect(() => {
//     const interceptor = api.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response) {
//           if (error.response.status === 401) {
//             setUserSession(true);
//             setUser(null);
//             toast({
//               title: "Session Expired",
//               description: error.response.data.error || "Please log in again.",
//               status: "warning",
//               duration: 5000,
//               isClosable: true,
//               position: "top-center",
//             });
//           } else if (error.response.status === 500) {
//             toast({
//               title: "Server Error",
//               description: "An internal server error occurred.",
//               status: "error",
//               duration: 5000,
//               isClosable: true,
//               position: "top-center",
//             });
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       api.interceptors.response.clear(interceptor);
//     };
//   }, []); ///[api]

//   const checkAuth = async () => {
//     try {
//       const response = await api.get("/api/user/check-auth");
//       setUser(response.data);
//       setUserSession(false);
//     } catch (error) {
//       setUser(null);
//       setUserSession(true);
//       toast({
//         title: "Invalid Token",
//         description: error.response?.data.error || "Try to log in again.",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top-center",
//       });
//     }
//   };

//   useEffect(() => {
//     checkAuth(); // Check authentication when component mounts
//   }, []); // Empty dependency array ensures this runs once on mount

//   useEffect(() => {
//     // This will execute whenever `userSession` changes
//     if (userSession) {
//       console.log("User session expired");
//       return <SessionLogOut />;
//     }
//   }, [userSession]);

//   return (
//     <ChatContext.Provider
//       value={{
//         user,
//         setUser,
//         selectedChat,
//         setSelectedChat,
//         chats,
//         setChats,
//         fetchChatsAgain,
//         setFetchChatsAgain,
//         api,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const ChatState = () => {
//   return useContext(ChatContext);
// };
