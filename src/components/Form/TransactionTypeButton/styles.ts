import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";

interface IconsProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;


  border-radius: 5px;
  border: 1.5px solid rgba(150, 156, 179, 0.2);

  ${({ isActive, type }) =>  isActive && type === 'down' && css`
    background-color: ${({ theme}) => theme.colors.attention_light};
    border: none;
  `}

  ${({ isActive, type }) =>  isActive && type === 'up' && css`
    background-color: ${({ theme}) => theme.colors.success_light};
    border: none;
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) => type === "up" ? theme.colors.success : theme.colors.attention };
`;


export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
