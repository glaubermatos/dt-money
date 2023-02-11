import logoImage from '../../assets/logo-dt-money.svg'
import * as Dialog from '@radix-ui/react-dialog'

import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay />
                        
                        <Dialog.Content>
                            <Dialog.Title>Nova transação</Dialog.Title>
                            
                            <Dialog.Close />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}