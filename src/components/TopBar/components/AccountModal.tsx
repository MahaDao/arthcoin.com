import React, { useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import Modal from '../../NewModal/index';
import Label from '../../Label';
import useBasisCash from '../../../hooks/useBasisCash';
import TokenSymbol from '../../TokenSymbol';
import metaMaskIcon from '../../../assets/img/metamask.png';
interface props {
  onDismiss?: Function;
}
const AccountModal: React.FC<props> = () => {
  const basisCash = useBasisCash();

  const bacBalance = useTokenBalance(basisCash.ARTH);
  const displayBacBalance = useMemo(() => getDisplayBalance(bacBalance), [bacBalance]);

  const basBalance = useTokenBalance(basisCash.MAHA);
  const displayBasBalance = useMemo(() => getDisplayBalance(basBalance), [basBalance]);

  const babBalance = useTokenBalance(basisCash.ARTHB);
  const displayBabBalance = useMemo(() => getDisplayBalance(babBalance), [babBalance]);

  return (
    <Modal title="My Wallet" open>
      <div className="dialog-class display-flex-column margin-left-right-20 margin-bottom-20 border-bottom">
        <div className="dialog-class-1 width-100">
          <span className="white font18">Connected with Metamask</span>
          <span className="white font20 bold-600 pointer">Change</span>
        </div>
        <div className="dialog-class">
          <img src={metaMaskIcon} alt="Metamask" width="30px" />
          <CopyToClipboard text="0xf7dD...aD62">
            <div className="dialog-class margin-left-20">
              <p className="white font18 margin-right-5">0xf7dD...aD62</p>
              <FileCopyIcon className="font15 white pointer" />
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="MAHA" />
          <StyledBalance>
            <StyledValue>{displayBacBalance}</StyledValue>
            <Label text="MAHA Earned" color="rgba(255, 255, 255, 0.64)" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ARTH" />
          <StyledBalance>
            <StyledValue>{displayBasBalance}</StyledValue>
            <Label text="ARTH Earned" color="rgba(255, 255, 255, 0.64)" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ARTHB" />
          <StyledBalance>
            <StyledValue>{displayBabBalance}</StyledValue>
            <Label text="ARTHB Earned" color="rgba(255, 255, 255, 0.64)" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;