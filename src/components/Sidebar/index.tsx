import * as S from './styles'
import { IconButton } from '@material-ui/core'

import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'

import * as emailValidator from 'email-validator'
import { auth, db } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { addDoc, collection, query, where } from 'firebase/firestore'
import Chat from '../Chat/index';
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { chatMapper } from '../../utils/mappers'




function Sidebar() {
    const [user]= useAuthState(auth)
    const [search, setSearch] = useState<string|null>(null)
    const router = useRouter()
    const useChatRef = query(collection(db, 'chats'), where("users", 'array-contains', user?.email))
    const [chatsSnapshot] = useCollection(useChatRef)
    const [chats, setChats] = useState(chatMapper(chatsSnapshot?.docs))
    const [showChats, setShowChats] = useState(chats)


    const chatAlreadyExists = (recipientEmail:string) => !!chatsSnapshot?.docs.find(chat => chat.data().users.find((user:string) => user===recipientEmail)?.length > 0)
        
    
    useEffect(()=>{
        
        if(!search || '' ){
            setChats(chatMapper(chatsSnapshot?.docs))
            setShowChats(chatMapper(chatsSnapshot?.docs))
        } else {
            setShowChats(chats?.filter((chat) => getRecipientEmail(chat.users, user)?.includes(search)))
            
         }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search, chatsSnapshot])

    const createChat = () => {
        const input = prompt('Digite o email que deseja iniciar o chat')
        if(!input) return null
        if(emailValidator.validate(input) && !chatAlreadyExists(input) && input !== user?.email){
            addDoc(collection(db, "chats"), {
                users: [user?.email, input],

            })
            
        }
        
    }

    const logout = () => {
        router.push('/')
        auth.signOut()
    }


    return (
        <S.Container>
            <S.Header>
                <S.UserAvatar src={user!.photoURL!} onClick={logout} />

                <S.IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </S.IconsContainer>
            </S.Header>

            <S.Search>
                <SearchIcon />
                <S.SearchInput placeholder='Buscar conversa' value={search || ''} onChange={(e)=>setSearch(e.target.value)} />
            </S.Search>

            <S.SidebarButton onClick={createChat}>
                Iniciar nova conversa
            </S.SidebarButton>

            {/* Lista de conversas */}
            {showChats && showChats.length > 0 ? showChats?.map((chat)=> <Chat key={chat.id} id={chat.id} users={chat.users} />) : (

            <b>Nenhuma conversa encontrada</b>
            )}
        </S.Container>
    )   
}

export default Sidebar


