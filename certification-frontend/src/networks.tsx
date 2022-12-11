
import UniversityCertContractABI from './abi/UniversityCertContractABI.json';
export type NetworkId = number;

export enum NetworkIds {
  Ethereum = 1,
  Rinkeby = 4,
  Goerli = 5,
  Bsc = 56,
  BscTestnet = 97,
}

export const FromNetwork = NetworkIds.BscTestnet;

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
      UniversityCertContract: ''
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
      UniversityCertContract:'0xC15582Cb61237ab008E6020aC20629678D9cd51b',
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
