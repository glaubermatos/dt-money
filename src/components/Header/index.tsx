import logoImage from '../../assets/logo-dt-money.svg'
import * as Dialog from '@radix-ui/react-dialog'

import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />

                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}