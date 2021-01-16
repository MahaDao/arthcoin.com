import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';

const useStakedBalanceOnBoardroom = (kind: 'arthLiquidity' | 'arth' | 'mahaLiquidity') => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await basisCash.getStakedSharesOnBoardroom(kind));
  }, [basisCash, kind]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [setBalance, basisCash.isUnlocked, fetchBalance]);

  return balance;
};

export default useStakedBalanceOnBoardroom;