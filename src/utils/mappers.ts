import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const chatMapper = (chats:QueryDocumentSnapshot<DocumentData>[] | undefined ) => {
    return chats?.map( (chat) => ({ id: chat.id, users: chat.data().users  }))
}