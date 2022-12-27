import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme} from 'styled-components';
import { HistoryCard } from '~/components/HistoryCard';
import { Container, Header, Title, Content, ChartContainer } from "./styles";
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
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  async function loadData() {
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData )  => expensive.type === 'negative');

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
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
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
            labelRadius={60} //afastamento da label de centro da circunferencia
          />
        </ChartContainer>
      {
        totalByCategories.map(item => (
          <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} />
        ))
      }
      </Content>
    </Container>

  )
}
