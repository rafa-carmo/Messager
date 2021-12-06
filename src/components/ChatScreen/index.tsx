import * as S from './styles'
import { MessagesProps } from '../../../pages/chat/[id]';

import { auth, db } from '../../../firebase';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

import { useRouter } from 'next/dist/client/router';
import {  useRef, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';

import Message from '../Message/index';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon } from '@material-ui/icons';
import DoubleArrowTwoToneIcon from '@material-ui/icons/DoubleArrowTwoTone';


import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import RecorderButton from '../RecorderButton';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export type MessageProps = {
    id?: string
    timestamp?: string
    message: string
    user: string
}



function ChatScreen({chat, messages}:MessagesProps) {
    const [user] = useAuthState(auth)
    const [input, setInput] = useState('')


    const endOfMessagesRef = useRef<HTMLDivElement>(null)
 

    const router = useRouter()
    const recipientEmail = getRecipientEmail(chat?.users, user)

    
    const docChats = doc(db, 'chats', `${router.query.id}`)
    const queryMessages = query(collection(docChats, 'messages'), orderBy('timestamp', 'asc'))
    
    const [messagesSnapshot] = useCollection(queryMessages)


    const queryUser = query(collection(db, 'users'), where('email', '==', recipientEmail))
    const [recipientSnapshot] = useCollection(queryUser)
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message) => 
            {
 
                return (
                <Message 
                    key={message.id}
                    user={`${message.data().user}`}
                    message={`${message.data().message}`}
                    timestamp={message.data().timestamp?.toDate().getTime()}
                    
                />
                )})
            
            }else {
                return JSON.parse(messages!).map((message:MessageProps)=>(
                    <Message 
                        key={message.id}
                        user={message.user}
                        message={message.message}
                        timestamp={message.timestamp}
                    />
                    
            ))
        }
    }


    const sendMessage = (e: React.SyntheticEvent) => {
        e.preventDefault()

        const docUser = doc(db, 'users', `${user?.uid}`)
        setDoc(docUser, {lastSeen: serverTimestamp()}, {merge: true})

        addDoc(collection(docChats, 'messages'), {
            timestamp: serverTimestamp(),
            message: input,
            user: user?.email
        })
        setInput('')
        ScrollToBottom()
    }


    const ScrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    const stopRecord = () => {}
    return (
        <S.Container>
            <S.Header>
                {
                    recipient ? (
                        <Avatar src={recipient?.photoUrl} />
                    ) : (
                        <Avatar>{recipientEmail![0]}</Avatar>
                    )
                }
                <S.HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Online a: {' '}
                            <b>
                            {recipient?.lastSeen?.toDate() ? dayjs(recipient.lastSeen.toDate()).fromNow() : "Desconhecido"}
                            </b>
                        </p>
                    ) : (
                        <p>Carregando...</p>
                    )}
                    
                </S.HeaderInformation>
                <S.HeaderIcons>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </S.HeaderIcons>
            </S.Header>

            <S.MessageContainer>
                {showMessages()}
                <S.EndOfMessages ref={endOfMessagesRef}/>
            </S.MessageContainer>
            <S.InputContainer>
                <InsertEmoticon />
                <S.Input value={input} onChange={e => setInput(e.target.value)} />
                <S.Button disabled={!input} type="submit" onClick={sendMessage}><DoubleArrowTwoToneIcon  /></S.Button>
                <RecorderButton />
            </S.InputContainer>
        </S.Container>
    )
}

export default ChatScreen
