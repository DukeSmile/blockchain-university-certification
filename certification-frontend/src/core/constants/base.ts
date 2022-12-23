import Web3 from 'web3';


import { contractABIs, networks, FromNetwork } from '../../networks';
import { chains } from '../../providers';

export const baseServerUrl = 'http://localhost:3200/api';
// export const baseServerUrl = 'http://95.217.49.117/api';
const connectWeb3 = new Web3(chains[FromNetwork].rpcUrls[0]);
export {connectWeb3};

export const getContract = () => {
    const w3 = new Web3(Web3.givenProvider);
    return new w3.eth.Contract(contractABIs['UniversityCertContract'], networks[FromNetwork].addresses['UniversityCertContract']);
};


export const INSTITUTE_ROLE = '0xbe66d68c3e13b65b5888dc75d3dac51207f0ab6266b017310fe8d5d9fe724a32';

export const projectId = '2JHXvB0V0UmerkQHYCFelKs3WIB';
export const projectSecret = 'd3b9afeea23ea5ce6d97f3b549db27a0';