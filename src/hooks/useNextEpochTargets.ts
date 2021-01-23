import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';


const useNextEpochTargets = (currentPrice: BigNumber) => {
  const [supplyIncrease, setSupplyIncrease] = useState<BigNumber>(BigNumber.from(0));
  const [debtIncrease, setDebtIncrease] = useState<BigNumber>(BigNumber.from(0));
  const [inExpansion, setExpansion] = useState(false);
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async (price: BigNumber) => {
    setSupplyIncrease(await basisCash.getTreasuryEstimateSeignorageToMint(price))
    setDebtIncrease(await basisCash.getTreasuryEstimateSeignorageToMint(price))
    setExpansion(true)
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice(currentPrice).catch((err) => console.error(`Failed to fetch uniswap liquidity: ${err.stack}`));
  }, [basisCash, fetchCashPrice, currentPrice]);

  return { supplyIncrease, debtIncrease, inExpansion};
};

export default useNextEpochTargets;
