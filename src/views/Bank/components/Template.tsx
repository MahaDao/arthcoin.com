import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';

interface TemplateProps {
  title: string;
  symbol: string;
  amount: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  buttonOnClick: () => void;
}

const Template: React.FC<TemplateProps> = (props) => (
  <Content>
    <Label>{props.title}</Label>
    <Actions>
      <Icon>
        <TokenSymbol size={40} symbol={props.symbol} />
      </Icon>
      <Amount>{props.amount}</Amount>
      <ButtonContainer>
        <Button
          onClick={props.buttonOnClick}
          disabled={props.buttonDisabled}
          text={props.buttonLabel}
        />
      </ButtonContainer>
    </Actions>
  </Content>
);

const Content = styled.div`
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  line-height: 1;
  text-align: left;
  padding: 30px;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 15px 0 0;
`;

const Icon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  padding: 5px;

  width: 50px;
  height: 50px;
  border-radius: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Amount = styled.div`
  // align-items: center;
  padding: 15px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  color: red;
`;

export default Template;
