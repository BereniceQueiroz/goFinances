import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from "styled-components";
import { useAuth } from '~/hooks/auth';
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
  LogoutButton,
  LoadContainer
} from "./styles"

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTransactions: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const theme = useTheme();
  const { user, signOut } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
    ){

    const collectionFilttered = collection.filter(transaction => transaction.type === type)

    if (collectionFilttered.length === 0 ) {
      return 0;
    }
    const lastTransaction =  new Date(
      Math.max.apply(Math, collectionFilttered
      .map((transaction) => new Date(transaction.date).getTime())));

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', {
        month: 'long'
      })}`;
    }

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;


    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      }

      if(item.type === 'negative') {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL"
      });
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    let total = entriesTotal - expensiveTotal;
    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval =  lastTransactionExpensives === 0 
      ? 'Não há transações'
      : `01 a ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: lastTransactionEntries === 0
        ? 'Não há transações'
        : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: lastTransactionExpensives === 0
        ? 'Não há transações'
        : `Última saída ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: totalInterval,
      }
    })
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]));

  return (
    <Container>
      {
        isLoading
        ?
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size='large' />
          </LoadContainer>
        :
        <>
          <Header>
            <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: user.photo }}/>
              <User>
                <UserGreeting>Olá, </UserGreeting>
                <UserName>{user.name}</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={signOut}>
              <Icon name={'power'} />
            </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard type="up" title="Entradas" amount={highlightData.entries.amount} lastTransactions={highlightData.entries.lastTransactions} />
            <HighlightCard type="down" title="Saídas" amount={highlightData.expensives.amount} lastTransactions={highlightData.expensives.lastTransactions} />
            <HighlightCard type="total" title='Total' amount={highlightData.total.amount} lastTransactions={highlightData.total.lastTransactions}  />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TransactionCard data={item} />
                )}
              />
          </Transactions>
        </>
      }
    </Container>
  )
}
