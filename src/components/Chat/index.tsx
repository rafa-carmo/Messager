import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import getRecipientEmail from '../../utils/getRecipientEmail'
import * as S from './styles'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';


type ChatProps = {
    id: string
    users: string[]
}

function Chat({id, users}:ChatProps) {

    const router = useRouter()

    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)

    const useUserRef = query(collection(db, 'users'), where("email", '==', recipientEmail))
    const [recipientSnapshot] = useCollection(useUserRef)

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <S.Container onClick={enterChat}>
            {recipient ? (

                <S.UserAvatar src={recipient.photoURL} />
            ) : (
                <S.UserAvatar> {recipientEmail![0].toUpperCase()} </S.UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </S.Container>
    )
}

export default Chat
