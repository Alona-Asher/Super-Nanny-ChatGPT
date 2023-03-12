import { useState } from 'react'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import './App.css'

export const ChatBox = () => {
    const API_KEY = "ask Alona for the key";
    const CHATGPT_SENDER = "ChatGPT";

    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hi there, SUPER NANNY is at your service! Feel free to ask me anything about parenthood.",
            sender: CHATGPT_SENDER
        }, 
        {
            message: "What would you like to know?",
            sender: CHATGPT_SENDER
        } 
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage];    
        setMessages(newMessages);
        setTyping(true);    
        await processMsgToChatGPT(newMessages);
    }

    async function processMsgToChatGPT(chatMessages){
    let apiMessages = chatMessages.map((messageObj) => {
        let role = (messageObj.sender === CHATGPT_SENDER) ?
        "assistant" : "user";
        return { role: role, content: messageObj.message }      
    });

    const systemMessage = {
        role: "system",
        content: "Explain like you are an experienced parents consultant talking to young parents. Be very supportive and caring."
    }
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [systemMessage, ...apiMessages]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
    }).then((data) => { 
        return data.json();    
    }).then((data) => {
        setMessages(
        [...chatMessages, {
            message: data.choices[0].message.content,
            sender : CHATGPT_SENDER
        }, 
        {
            message: "Anything else you would like to ask me?",
            sender: CHATGPT_SENDER
        }]
        )
        setTyping(false);
    });
    }
    return (
        <div style={{ position: "relative", height: "500px", width: "700px"}}>
            <MainContainer>
                <ChatContainer>
                <MessageList
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content="Super Nanny is typing"/> : null}
                    >
                    {messages.map((message, i) => {
                    return <Message key={i} model={message} />
                    })}
                </MessageList>
                <MessageInput placeholder='Type response here' onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
    )
}