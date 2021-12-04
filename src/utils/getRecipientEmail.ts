import { User } from "firebase/auth";

const getRecipientEmail = (users?:string[], userLoggedIn?: null | User)=> users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]

export default getRecipientEmail