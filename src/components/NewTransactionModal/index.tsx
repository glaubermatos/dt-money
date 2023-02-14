import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const NewTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number().min(1),
    category: zod.string(),
    type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionsContext)

    const { 
        reset,
        control,
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(NewTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(errors)
        console.log(data)

        const {description, price, category, type} = data

        await createTransaction({
            description,
            price,
            category,
            type
        })

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />
            
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')}
                    />
                    <input 
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', {valueAsNumber: true})}
                    />
                    <input 
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            console.log(field)
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton value="income" variant='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value="outcome" variant='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}