
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import { MessageProps } from '../ChatScreen'
import * as S from './styles'


import moment from 'moment'
moment.locale('pt-br')


function Message({user, message, timestamp}: MessageProps) {
    
    const[userLogged] = useAuthState(auth)
    

    return (
        <S.Container>
            <S.MessageElement typeOfMessage={user === userLogged?.email ? 'sender' : 'reciever'}>
                <S.MessageContainer><b>{message}</b></S.MessageContainer>
                <S.Timestamp>{timestamp ? moment(timestamp).format('LT') : '...'}</S.Timestamp>
            </S.MessageElement>
        </S.Container>
    )
}

export default Message
