import Spinner from '../Spinner'
import * as S from './styles'

function Loading() {
    return (
        <S.Container>
            <div>
            <S.Logo src="/logo.svg" alt="Logo" />
            <Spinner />
            </div>
        </S.Container>
    )
}

export default Loading
