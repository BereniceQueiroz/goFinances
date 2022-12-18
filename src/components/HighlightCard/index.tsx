import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction
} from "./styles";

interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransactions: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard({type, title, amount, lastTransactions}: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}/>
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransactions}</LastTransaction>
      </Content>
    </Container>
  )
}
