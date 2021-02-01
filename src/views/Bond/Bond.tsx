import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import ExchangeCardBonds from './components/ExchangeCardBonds';
import Container from '../../components/Container';
import styled from 'styled-components';
import useBondStats from '../../hooks/useBondStats';
import useBasisCash from '../../hooks/useBasisCash';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useCashTargetPrice from '../../hooks/useCashTargetPrice';
import { getDisplayBalance } from '../../utils/formatBalance';
import useStabilityFee from '../../hooks/useStabilityFee';
import BondsIcon from '../../assets/svg/Bond.svg';
import Chart from './components/Chart';
import { BigNumber } from 'ethers';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useBondOraclePriceInLastTWAP();
  const targetPrice = useCashTargetPrice();
  const stabiltiyFees = useStabilityFee();

  const bondBalance = useTokenBalance(basisCash.ARTHB);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);

      addTransaction(tx, {
        summary: `Buy ARTHB with ${amount} DAI`,
      });
    },
    [basisCash, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} ARTHB` });
    },
    [basisCash, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice?.gt(targetPrice), [cashPrice, targetPrice]);
  const isBondPurchasable = useMemo(() => {
    // const denominator1e18 = BigNumber.from(10).pow(18);

    // const currentPrice = BigNumber.from(cashPrice)
    //   .mul(denominator1e18)
    //   .div(1000);
    return cashPrice.lt(targetPrice);
  }, [bondStat, cashPrice, targetPrice]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();

  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={<img alt="bonds" src={BondsIcon} width="200px" />}
            title="Buy & Redeem Bonds"
            subtitle="Earn premiums upon redemption"
          />
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does ARTH Bond work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism"
          />
        </Page>
      </Switch>
    );
  }

  if (!basisCash) return <div />;

  return (
    <Switch>
      <Page>
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img alt="bonds" src={BondsIcon} width="250px" />}
              title="Buy & Redeem Bonds"
              subtitle="Bonds can be bought when ARTH is trading below it's target price and can be redeemed at a premium when ARTH is trading above it's target price."
            />
          </Route>
          <Container size="lg">
            <div className="border-bottom width-100 margin-bottom-20" />
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} md={8} lg={8} xl={8}>
                {false && (
                  <ChartContainer>
                    <p className="white font20 bold-600 margin-left-15">ARTH Price</p>
                    <Chart />
                  </ChartContainer>
                )}
                <Grid container spacing={3} justify="center">
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <ExchangeCard
                      action="Purchase"
                      fromToken={basisCash.DAI}
                      fromTokenName="DAI"
                      toToken={basisCash.ARTHB}
                      toTokenName="ARTHB"
                      addOnTokeName="ARTH"
                      addOnToken="ARTH"
                      priceDesc={
                        !isBondPurchasable
                          ? "ARTH is over it's target price"
                          : `ARTH is below it's target price. You can pruchase bonds now.`
                      }
                      onExchange={handleBuyBonds}
                      disabled={!isBondPurchasable}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <ExchangeCardBonds
                      action="Redeem"
                      fromToken={basisCash.ARTHB}
                      fromTokenName="ARTHB"
                      toToken={basisCash.DAI}
                      toTokenName="DAI"
                      priceDesc={`${getDisplayBalance(bondBalance)} ARTHB Available`}
                      onExchange={handleRedeemBonds}
                      disabled={!isBondRedeemable}
                      disabledDescription={
                        !isBondRedeemable
                          ? `Enabled when ARTH > $${getDisplayBalance(targetPrice)}`
                          : null
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={4} lg={4} xl={4}>
                <Grid container spacing={5} justify="center">
                  <Grid container item xs={12} md={12} lg={12} xl={12}>
                    <ExchangeStat
                      title={`MAHA: $${getDisplayBalance(cashPrice, 18, 2)}`}
                      description="Last-Hour TWAP Price"
                      toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                  </Grid>
                  <Grid container item xs={12} md={12} lg={12} xl={12}>
                    <ExchangeStat
                      title={`ARTHB: $${bondStat?.priceInDAI || '-'}`}
                      description="Current Price: (ARTH)^2"
                      toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                  </Grid>
                  <Grid container item xs={12} md={12} lg={12} xl={12}>
                    <ExchangeStat
                      title={`Target: $${getDisplayBalance(targetPrice, 18, 2)}`}
                      description="Target Price"
                    />
                  </Grid>
                  <Grid container item xs={12} md={12} lg={12} xl={12}>
                    <ExchangeStat
                      title={`${stabiltiyFees}%`}
                      description="Fees paid in $MAHA when redeeming bonds"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

export default Bond;
