import React, { useEffect, useState } from "react";
import { useChannel } from "ably/react";
export default function Chatbox() {
  let inputBox = null;
  let messageEnd = null;
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const { channel, ably } = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });
  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };
  const handleKeyPress = (event) => {
    console.log(event);
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };
  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <div
        className={
          author !== "me"
            ? "mb-4 flex flex-row-reverse justify-end"
            : "mb-4 flex justify-end"
        }
      >
        <div
          key={index}
          className={
            author !== "me"
              ? "bg-gray-400 text-white ml-2 max-w-sm rounded-br-3xl rounded-tl-xl rounded-tr-3xl px-4 py-3"
              : "bg-blue-400 text-white mr-2 max-w-sm rounded-bl-3xl rounded-tl-3xl rounded-tr-xl px-4 py-3"
          }
        >
          {message.data}
        </div>
        <div>
          <h1>{author}</h1>
        </div>
      </div>
    );
  });
  return (
    <div className="h-chatbox flex w-full flex-col justify-between px-5">
      <div className="mt-5 flex flex-col">
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form
        onSubmit={handleFormSubmission}
        className="grid grid-cols-1 border-t-2"
      >
        <div className="py-5">
          <input
            ref={(element) => {
              inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
            className=" bg-gray-300 w-full rounded-xl px-3 py-5"
          ></input>
        </div>
      </form>
    </div>
  );
}
