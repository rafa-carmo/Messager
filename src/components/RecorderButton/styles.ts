import styled,  {css} from 'styled-components'
import { IconButton as MUIIconButton } from '@material-ui/core';


type IconButtonProps={
    active: boolean
}
export const IconButton = styled(MUIIconButton)<IconButtonProps>`
    ${({active})=>css`
    background: ${active ? css`57886c` : css`transparent`};
    `}
`

export const Hidden = styled.div`
    display:none;
`