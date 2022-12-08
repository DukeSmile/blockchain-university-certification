import UniversityCertContractABI from './abi/UniversityCertContractABI.json';

export type NetworkId = number;

export enum NetworkIds {
  Ethereum = 1,
  Rinkeby = 4,
  Goerli = 5,
  Bsc = 56,
  BscTestnet = 97,
}

export const FromNetwork = NetworkIds.Rinkeby;

interface INetwork {
  name: string,
  isEnabled: boolean,
  addresses: { [key: string]: string },
  logo?: any
}

interface INetworks {
  [key: string]: INetwork;
}

export const networks: INetworks = {
  [NetworkIds.Goerli]: {
    name: 'Ethereum Goerli',
    isEnabled: true,
    addresses: {
      UniversityCertContract: '0xD6B2fC46FF8B00025F5f1bc0Ec7cA3c8818d67D5'
    }
  },
  [NetworkIds.Ethereum]: {
    name: 'Ethereum',
    isEnabled: true,
    addresses: {
      UniversityCertContract: '',
      OKAPI: ''
    }
  },
  [NetworkIds.Bsc]: {
    name: 'BSC',
    isEnabled: true,
    addresses: {
      UniversityCertContract: '',
      OKAPI: ''
    }
  },
  [NetworkIds.BscTestnet]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      UniversityCertContract:'0xE5E1a756E164b619495A55C2699D64Fc538f32B9',
    }
  }
};

interface tokenABIS {
  [key: string]: any;
};
export const contractABIs: tokenABIS = {
  UniversityCertContract: UniversityCertContractABI
}

export const enabledNetworkIds: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled);
