import * as S from './styles'
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MessagesProps } from '../../../pages/chat/[id]';
import getRecipientEmail from '../../utils/getRecipientEmail';

function ChatTemplate({messages, chat}:MessagesProps) {

    const [user] = useAuthState(auth)


    return (
        <S.Container>
            <Head>
                <title>Conversa com {getRecipientEmail(chat?.users, user)}</title>
            </Head>
            <Sidebar />

            <S.ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
                
            </S.ChatContainer>
        </S.Container>
    )
}

export default ChatTemplate
