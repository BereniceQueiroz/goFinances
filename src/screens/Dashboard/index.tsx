import React from 'react';
import { HighlightCard } from '~/components/HighlightCard';
import { TransactionCardProps, TransactionCard } from '~/components/TransactionCard';

import { Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from "./styles"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {

  const dataList: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title:"Desenvolvimento de site",
      amount:"R$ 12.000,00",
      category:{
        name: "Vendas",
        icon: "dollar-sign"
      },
      date:"13/04/2022",
    },
    {
      id: "2",
      type: "positive",
      title:"Desenvolvimento de site",
      amount:"R$ 22.000,00",
      category:{
        name: "Vendas",
        icon: "dollar-sign"
      },
      date:"15/12/2022",
    },
    {
      id: "3",
      type: "negative",
      title:"Mercado",
      amount:"R$ 800,00",
      category:{
        name: "Alimentação",
        icon: "coffee"
      },
      date:"15/12/2022",
    },
    {
      id: "4",
      type: "negative",
      title:"Aluguel",
      amount:"R$ 2.000,00",
      category:{
        name: "Casa",
        icon: "shopping-bag"
      },
      date:"15/12/2022",
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/52019177?v=4' }}/>
          <User>
            <UserGreeting>Olá, </UserGreeting>
            <UserName>Berenice</UserName>
          </User>
        </UserInfo>
        <LogoutButton onPress={() => {}}>
          <Icon name={'power'} />
        </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransactions='Última saída dia 03 de abril' />
        <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransactions='Última saída dia 03 de abril' />
        <HighlightCard type="total" title='Total' amount='R$ 16.141,00' lastTransactions='01 à 16 de abril'  />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
          <TransactionsList
            data={dataList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TransactionCard data={item} />
            )}
          />
      </Transactions>
    </Container>
  )
}
