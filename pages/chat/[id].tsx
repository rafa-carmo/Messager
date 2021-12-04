import { query, collection, doc, orderBy, getDocs, where, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from "next"
import { db } from '../../firebase';
import ChatTemplate from "../../src/templates/Chat"
export type MessagesProps = {
    messages?: string
    chat?: {
        id?: string
        users: string[]
    }
}

function Chat({messages, chat}:MessagesProps) {
    return (
        <ChatTemplate messages={messages} chat={chat}/>
    )
}

export default Chat

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const ref =  doc(db, 'chats', `${context.query.id}`)

    
    
    const refDoc = query(collection(ref, 'messages'), orderBy("timestamp", "asc"))
    
    
    const messagesRes = await getDocs(refDoc)
    
    const messages = messagesRes.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    })).map((messages:any) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    
    
    // const chatDocs = getDocs(chatDoc)
    const chatRes = await getDoc(ref)
    
    const chat = {
        id: chatRes?.id,
        ...chatRes?.data()
    }
    
    
    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}