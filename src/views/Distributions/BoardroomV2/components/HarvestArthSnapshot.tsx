import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import TokenSymbol from '../../../../components/TokenSymbol';
import CardContent from '../../../../components/CardContent';
import CardIcon from '../../../../components/CardIcon';
import useEarningsFromSnapshot from '../../../../hooks/useEarningsFromSnapshot';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import { VaultInfo } from '../../../../basis-cash/types';
import { Grid } from '@material-ui/core';

const HarvestArthSnapshot = ({ vault }: { vault: VaultInfo }) => {
  const [earnings, contractBalance, claimRewards, reinvestRewards] = useEarningsFromSnapshot(vault);

  const canClaim = earnings.lte(contractBalance) && !earnings.eq(0)

  if (earnings.eq(0)) return <div />

  return (
    <Grid container item xs={12} md={6} lg={4} xl={4}>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyleLabel>ARTH Earned (Old Rewards)</StyleLabel>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="ARTH" />
              </CardIcon>
              <StyledValue>{getDisplayBalance(earnings)}</StyledValue>
            </StyledCardHeader>
          </StyledCardContentInner>
          <p style={{ color: '#fff9' }}>
            These are the rewards you've earned from the previous rewards contracts.
          </p>
          {/* <br /> */}
          {
            earnings.gt(contractBalance) && earnings.gt(0) && (
              <p style={{ color: '#fff9' }}>
                The contract's claimable balance
                is {getDisplayBalance(contractBalance)} ARTH. But that is
                not sufficient for your claimable reward. By the next
                epoch your rewards will be claimable.
              </p>
            )
          }
          <StyledCardActions>
            <Button onClick={reinvestRewards} text={`Compound Rewards`} disabled={!canClaim} />
          </StyledCardActions>
          <br />
          <StyledCardActions>
            <Button onClick={claimRewards} text={`Claim Rewards`} disabled={!canClaim} />
          </StyledCardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};
const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
`;
const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: start;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.64;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: column;
`;

export default HarvestArthSnapshot;
