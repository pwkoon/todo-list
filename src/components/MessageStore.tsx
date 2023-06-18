import { action, computed, makeObservable, observable } from "mobx";

type MessageItem = {
  id: number;
  content: string;
  noted: boolean
}

export class MessageStoreImpl {
  messages: MessageItem[] = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      addMessage: action,
      toggleMessage: action,
      clearMessages: action,
      status: computed
    });

  }
  addMessage(content: string) {
    const item: MessageItem = {
      id: +Math.random().toFixed(4),
      content,
      noted: false
    };
    this.messages.push(item);
  }

  toggleMessage(id:number) {
    const index = this.messages.findIndex(message => message.id === id);
    if (index > -1){
      this.messages[index].noted = !this.messages[index].noted;
    }
  }

  clearMessages() {
    this.messages = []
  }

  get status() {
    let noted = 0, remaining = 0;
    this.messages.forEach((message) => {
      if (message.noted) {
        noted ++;
      } else {
        remaining ++;
      };
    });
      return {noted, remaining}
  }
}

// WHY NEED TO CONST THIS??
 export const MessageStore = new MessageStoreImpl();
