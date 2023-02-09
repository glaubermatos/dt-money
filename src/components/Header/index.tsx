import logoImage from '../../assets/logo-dt-money.svg'

import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                
                <NewTransactionButton>Nova transação</NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}