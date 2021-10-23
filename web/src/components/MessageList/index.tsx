import { useEffect, useState } from 'react';
import {api} from '../../services/api'
import io from 'socket.io-client'

import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'


type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue = Message[] = [];
const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
})

socket.on('new_message', newMessage => [
  console.log(newMessage)
])

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get<Message[]>('/messages/last3').then(response => {
      
      console.log(response.data);

      setMessages(response.data);
    })
  }, [])


  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DOWhite 2021" />

      <ul className={styles.messageList}>

        {messages.map(message => {
          return (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text} </p>
              <div className={styles.messageUser}>
                <div className={styles.messageImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          )
        })}

      </ul>
    </div>
  )
}
