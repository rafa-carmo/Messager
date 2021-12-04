import styled from 'styled-components'
import { Avatar, Button } from '@mui/material'

export const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 18rem;
    max-width: 23rem;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

export const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background: #FFF;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    height: 8rem;
    border-bottom: 1px solid whitesmoke;
`

export const UserAvatar = styled(Avatar)`
    cursor: pointer;
    transition: opacity 0.2s;
    :hover {
        opacity: 0.8;
    }
`

export const IconsContainer = styled.div``


export const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem;
    border-radius: 0.2rem;
`


export const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`


export const SidebarButton = styled(Button)`
    width: 100%;
    &&&{
        padding: 1rem 0;
        border-bottom: solid whitesmoke 1px;
        border-top: solid whitesmoke 1px;
    }

`
