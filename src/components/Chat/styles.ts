import { Avatar } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    align-items: center;
    cursor: pointer;
    padding: 1.5rem;
    word-break: break-word;

    :hover{
        background: #e9eaeb;
    }
`

export const UserAvatar = styled(Avatar)`
    margin: 0.5rem;
    margin-right: 1.5rem;
`