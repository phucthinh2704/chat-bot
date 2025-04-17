// chứa thông tin của một khung chat

import { createSlice } from "@reduxjs/toolkit";
import { marked } from "marked";
import { v4 } from "uuid";
import DOMPurify from "dompurify";

const initData = {
	data: [],
};

/**
 * 
  "data": [  
    {  
      "id": 1,  
      "title": "gwegweqw",  
      "messages": [  
        { "id": 1, "text": "react là gì", "isBot": false },  
        { "id": 2, "text": "react là lib của js", "isBot": true }  
      ]  
    }  
  ]  
*/

const ChatSlice = createSlice({
	name: "chat",		// name dùng để tạo type mặc định cho action({ type: "chat/addChat", payload })
	initialState: initData,
	reducers: {
		addChat: (state, action) => {
			if (!action.payload)
				state.data.push({
					id: v4(),
					title: "chat",
					messages: [],
				});
			else
				state.data.push({
					id: action.payload,
					title: "chat",
					messages: [],
				});
		},
		addMessage: (state, action) => {
			const { idChat, userMess, botMess } = action.payload;
			const chat = state.data.find((chat) => chat.id === idChat);
			if (chat) {
				const messageFormat = marked.parse(botMess);		// chuyển text thành html
				const safeChat = DOMPurify.sanitize(messageFormat);	// lọc html
				const newMessage = [
					...chat.messages,
					{
						id: v4(),
						text: userMess,
						isBot: false,
					},
					{
						id: v4(),
						text: safeChat,
						isBot: true,
					},
				];
				chat.messages = newMessage;
			}
		},
		removeChat: (state, action) => {
			state.data = state.data.filter(
				(chat) => chat.id !== action.payload
			);
		},
		setNameChat: (state, action) => {
			const { newTitle, chatId } = action.payload;
			const chat = state.data.find((chat) => chat.id === chatId);
			if (chat) {
				chat.title = newTitle;
			}
		},
	},
});

export const { addChat, removeChat, addMessage, setNameChat } =
	ChatSlice.actions;

export default ChatSlice.reducer;
