import React from 'react'
import Chat from '../components/Chat'

function ChatList({chats}) {
  return (
    <>
    {
        chats.map(chat=>{
            return <Chat key={chat.id} chat={chat}/>
        })
    }</>
  )
}

export default ChatList