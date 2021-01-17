import ERC20 from './ERC20';

export type ContractName = string;

export interface BankInfo {
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;

  poolRewards: number
  poolDurationInDays: number
  poolSize: number
}


export interface BoardroomInfo {
  kind: 'arth' | 'arthLiquidity'  | 'mahaLiquidity'
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  seionrageSupplyPercentage: number
  history7dayAPY: number
  lockInPeriodDays: number
}

export interface Bank extends BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;

  currentAPY: number
  hasLocking: boolean
  lockinDays: number
  supplyFromARTH: number
}

export type TokenStat = {
  priceInDAI: string;
  totalSupply: string;
};

export type TreasuryAllocationTime = {
  currentEpoch: Number
  prevAllocation: Date;
  nextAllocation: Date;
}