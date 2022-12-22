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

export const certProcesses:string[] = ['term1', 'term2'];

export const certSubjects:{[key:string]: string[]} = {
    'term1' : ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7', 'subject8'],
    'term2' : ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7', 'subject8']
};
