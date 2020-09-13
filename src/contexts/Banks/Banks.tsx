import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import { Bank } from '../../basis-cash';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const pools = basisCash.bankContracts();
    const banks: Bank[] = [];

    for (const [name, contract] of Object.entries(pools)) {
      const bankInfo = bankDefinitions[name];
      banks.push({
        ...bankInfo,
        contract,
        id: name,
        depositTokenAddress: config.externalTokens[bankInfo.depositTokenName],
        earnTokenAddress: config.deployments[bankInfo.earnTokenName].address,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [basisCash, setBanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [basisCash, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;