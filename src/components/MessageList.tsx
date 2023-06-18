import React, { ChangeEvent, useState } from "react";
import { MessageStoreImpl }  from "./MessageStore"
import { observer } from "mobx-react";

interface MessageListProps {
  messageStore: MessageStoreImpl
}

export const MessageList: React.FC<MessageListProps> = observer(({messageStore}) => {

  const [message, setMessage] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value)
  };

  const handleSubmit = (): void => {
    if (message) {
      messageStore.addMessage(message)
    }
    setMessage('');
  };

  return (
    <>
      <div>
        <input type="text" value={message} placeholder="Leave your message here..."onChange={handleChange} />
        <button onClick={handleSubmit}>Leave</button>
      </div>
      <div>
        <p>Noted: {messageStore.status.noted}</p>
        <p>Remaining: {messageStore.status.remaining}</p>
      </div>
      <ul>
        {messageStore.messages.map((message) => {
          return (
            <div className="message">
              <li>[{message.noted === true && "X"}]{message.content}</li>
              <button onClick={() => messageStore.toggleMessage(message.id)}>Mark noted!</button>
            </div>
          )
        })}
      </ul>
      <button onClick={() => messageStore.clearMessages()}>Delete all!</button>
    </>
  )
});
