import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import { useWallet } from 'use-wallet';
import Button from '../../../components/Button';
import CardContent from '../../../components/CardContent';
import useBasisCash from '../../../hooks/useBasisCash';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import ArrowRight from '../../../assets/img/ArrowRight.svg';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModalBonds';
import ERC20 from '../../../basis-cash/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import InfoIcon from '../../../assets/img/InfoWarning.svg';
interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);
const ExchangeCardBonds: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const { account, connect } = useWallet();
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBasisCash();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);
  const [showModal, toggleModal] = React.useState(false);
  const balance = useTokenBalance(fromToken);
  return (
    <Card>
      {showModal && (
        <ExchangeModal
          title={action}
          description={priceDesc}
          max={balance}
          onConfirm={(value) => {
            onExchange(value);
          }}
          onCancel={() => toggleModal(false)}
        />
      )}
      <div className="dialog-class">
        <StyledCardTitle>Redeem ARTH</StyledCardTitle>
        <HtmlTooltip
          enterTouchDelay={0}
          title={
            <span>
              When ARTH is below it’s target price; you can buy ARTH bonds with DAI by
              influencing the price on Uniswap. Bond tokens are bought at a discount are
              redeemed for a profit.
            </span>
          }
        >
          <img src={InfoIcon} alt="Inof" width="24px" className="margin-left-10" />
        </HtmlTooltip>
      </div>
      <div className="border-bottom width-100 margin-bottom-20" />
      <CardContent>
        <StyledCardContentInner>
          <StyledExchanger>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={fromToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={fromTokenName} variant="normal" />
            </StyledToken>
            <StyledExchangeArrow>
              <img src={ArrowRight} alt="" width="24px" />
            </StyledExchangeArrow>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={toToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={toTokenName} variant="normal" />
            </StyledToken>
          </StyledExchanger>
          <StyledDesc>{priceDesc}</StyledDesc>
          <StyledCardActions>
            <Button onClick={() => toggleModal(true)} text="Redeem" />
          </StyledCardActions>
          {false && (
            <StyledCardActions>
              {!!account ? (
                approveStatus !== ApprovalState.APPROVED && !disabled ? (
                  <Button
                    disabled={
                      approveStatus === ApprovalState.PENDING ||
                      approveStatus === ApprovalState.UNKNOWN
                    }
                    onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
                    text="Redeem"
                  />
                ) : (
                  <Button
                    text={disabledDescription || action}
                    onClick={() => toggleModal(true)}
                    disabled={disabled}
                  />
                )
              ) : (
                <Button onClick={() => connect('injected')} text="Unlock Wallet" />
              )}
            </StyledCardActions>
          )}
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  font-size: 18px;
  padding-top: 20px;
  font-weight: 600;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardDesc = styled.div`
  margin-bottom: 26px;
  text-align: center;
  color: #fff9;
`;

const StyledCardIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[300]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;

const StyledDesc = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: linear-gradient(180deg, #1f1a1a 0%, #251c1d 100%);
  border-radius: 12px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
`;
export default ExchangeCardBonds;
