import React, { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Button from '../../components/Button/TransperantButton';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../basis-cash';
import StakingIcon from '../Banks/staking.png';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams<{ bankId: string }>();
  const bank = useBank(bankId);

  const { onRedeem } = useRedeem(bank);

  return bank ? (
    <>
      <PageHeader
        icon={<img alt="staking" src={StakingIcon} />}
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <Grid container spacing={5} justify="center" alignItems="stretch">
          <Grid container item xs={12} md={6} lg={6} xl={6}>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest bank={bank} />
              </StyledCardWrapper>
              <Divider />
              <StyledCardWrapper>
                <Stake bank={bank} />
              </StyledCardWrapper>
            </StyledCardsWrapper>
          </Grid>
          <Grid container item xs={12} md={6} lg={6} xl={6} justify="flex-end">
            <ParentContainer>
              {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
              <div style={{ maxWidth: '250px', marginTop: '20px', alignSelf: 'flex-end' }}>
                <Button onClick={onRedeem} text="Settle & Withdraw" />
              </div>
            </ParentContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <BankNotFound />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('ARTH')) {
    pairName = 'ARTH-DAI pair';
    uniswapUrl =
      'https://app.uniswap.org/#/add/0x6B175474E89094C44Da98b954EedeAC495271d0F/0x0e3cc2c4fb9252d17d07c67135e48536071735d9';
  } else {
    pairName = 'MAHA-ETH pair';
    uniswapUrl = 'https://app.uniswap.org/#/add/ETH/0xB4d930279552397bbA2ee473229f89Ec245bc365';
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`Provide liquidity to ${pairName} on Uniswap`}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const Divider = styled.div`
  background: #000;
  opacity: 0.2;
  height: 1px;
`;
const ParentContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
`;
const StyledLink = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.88);
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
