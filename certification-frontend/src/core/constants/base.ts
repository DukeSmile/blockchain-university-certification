import Web3 from 'web3';


import { contractABIs, networks, FromNetwork } from '../../networks';
import { chains } from '../../providers';
export const baseServerUrl = '';

const connectWeb3 = new Web3(chains[FromNetwork].rpcUrls[0]);
export {connectWeb3};

export const getContract = () => {
    const w3 = new Web3(Web3.givenProvider);
    return new w3.eth.Contract(contractABIs['UniversityCertContract'], networks[FromNetwork].addresses['UniversityCertContract']);
};








export const certProcesses:string[] = ['term1', 'term2'];

export const certSubjects:{[key:string]: string[]} = {
    'term1' : ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7', 'subject8'],
    'term2' : ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7', 'subject8']
};
