import styled, {css} from 'styled-components'

export const Container = styled.div``


export const Header = styled.div`
    position: sticky;
    background: #FFF;
    z-index: 2;
    top: 0;
    display: flex;
    padding: 1.1rem;
    height: 5.5rem;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

`

export const HeaderInformation = styled.div`
    margin-left: 1.5rem;
    flex: 1;

    h3 {
        margin-bottom: 0.3rem;

    }

    p{
        margin: 0;
        font-size: 0.7rem;
        color: gray;
    }
`

export const HeaderIcons = styled.div``


export const MessageContainer = styled.div`
    padding: 3rem;
    background: #e5ded8;
    min-height: 90vh;
`

export const EndOfMessages = styled.div``


export const InputContainer = styled.form`
    display: flex;
    align-items:center;
    padding: 1rem;
    position: sticky;
    bottom: 0;
    background: #FFF;
    z-index: 2; 
`

export const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 1rem;
    background: whitesmoke;
    padding: 1.2rem;
    margin: 0 1.5rem;
    
`

export const Button = styled.button`
    background: transparent;
    border: none;
    margin-left: -3.8rem;
    margin-right: 0.5rem;
    ${({disabled})=>css`
        color: ${!disabled && '#57886C'}    
    `}
    `