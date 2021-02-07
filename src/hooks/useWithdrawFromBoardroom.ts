import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    () => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroom(boardroom.kind),
        `Withdraw ${boardroom.depositTokenName}`,
      );
    },
    [basisCash, boardroom.depositTokenName, boardroom.kind, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
