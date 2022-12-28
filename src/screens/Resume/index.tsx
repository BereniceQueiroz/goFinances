import React, { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme} from 'styled-components';
import { HistoryCard } from '~/components/HistoryCard';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer
} from "./styles";
import { categories } from '~/utils/categories';


interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();

  function handleDateChange(action: 'next' | 'previous') {
    if(action === 'next') {
      const newDate = addMonths(selectedDate, 1); // adiciona ao mes + 1
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1); // remove ao mes - 1
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    ///newDate transforma string em date e getMonth pega somente o mês da date e getFullYear pega o ano
    const expensives = responseFormatted
      .filter((expensive: TransactionData )  =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

      const expensivesTotal = expensives.reduce((acumulator: number , expensive:TransactionData) => {
        return acumulator + Number(expensive.amount);
      }, 0);

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach((expensive: TransactionData) => {
          if(expensive.category === category.key) {
            categorySum += Number(expensive.amount)
          }
        });

        if(categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          const percent =  `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
          totalByCategory.push({
            key: category.key,
            name: category.name,
            color: category.color,
            total: categorySum,
            totalFormatted,
            percent
          })
        }
      });
      setTotalByCategories(totalByCategory)
      setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  },[selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading
        ?
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size='large' />
          </LoadContainer>
        :
          <Content
            showsVerticalScrollIndicator={false} //scroll no container desconsiderando a altura dos botoes
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>

              <MonthSelectButton onPress={() => handleDateChange('previous')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

              <MonthSelectButton onPress={() => handleDateChange("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>

            </MonthSelect>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent" y="total"
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={70} //afastamento da label de centro da circunferencia
              />
            </ChartContainer>
          {
            totalByCategories.map(item => (
              <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} />
            ))
          }
          </Content>
      }
    </Container>

  )
}
