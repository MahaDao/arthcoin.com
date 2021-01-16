import { useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { TreasuryAllocationTime } from '../basis-cash/types';

const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<TreasuryAllocationTime>({
    currentEpoch: 0,
    prevAllocation: new Date(),
    nextAllocation: new Date(),
  });
  const basisCash = useBasisCash();

  useEffect(() => {
    // if (basisCash) {
    //   basisCash.getTreasuryNextAllocationTime().then(setTime);
    // }
  }, [basisCash]);
  return time;
};

export default useTreasuryAllocationTimes;