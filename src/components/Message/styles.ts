import styled, {css} from 'styled-components'


export const Container = styled.div``


const MessageModifier = {
    sender: () => css`
        margin-left: auto;
        background: #dcf8c6;
    `,
    reciever: () => css`
        background: whitesmoke;
        text-align: left;
    `
}

type MessageProps = {
    typeOfMessage: 'sender' | 'reciever'
}

export const MessageElement = styled.p<MessageProps>`
    font-size: 1.1rem;
    font-weight: bold;
    width: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 0.8rem;
    min-width: 0.5rem;
    padding-bottom: 2rem;
    position: relative;
    text-align: right;
    ${({typeOfMessage})=>css`

        ${MessageModifier[typeOfMessage]};
    `}
`

export const Timestamp = styled.span`
    color: gray;
    padding: 1rem;
    font-size: 0.6rem;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`