import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { initProcesses, setRole } from "../../core/app/slices/certificationReducer";
import { useWeb3Context } from '../../core/hooks/web3Context';
import { getContract, INSTITUTE_ROLE } from '../../core/constants/base';
// import { setCharityType, setLoginUser, setSignHash } from '../../core/store/slices/bridgeSlice';
// import axios from 'axios';

export const ConnectWalletButton = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeStyle = 'm-5 hover:text-black';
  const ref = useRef<HTMLDivElement | null>(null);
  const { connect, disconnect, address, provider } = useWeb3Context();
  const [showMenu, setShowMenu] = useState(false);
  const baseStyles = {
    greenBtn: 'border p-10'
  }
  
  useEffect(() => {
    const getRole = async() => {
      dispatch(setRole(0));
      if (address === '') return;
      let certContract = getContract();
      try {
        const ownerAddr = await certContract.methods.owner().call();
        if (ownerAddr.toLowerCase() === address.toLowerCase()) {
          dispatch(setRole(1));
          return;
        }
        const instituteFlag = await certContract.methods.hasRole(INSTITUTE_ROLE, address).call();
        if (instituteFlag) {
          dispatch(setRole(1));
          return;
        }
      }
      catch(e:any){
        console.log(e.message);
      } 
    }
    getRole();
  }, [address]);

  return (
    <div className="z-100 flex">
      {
        address === '' ? (
          <button className={baseStyles.greenBtn} onClick={connect}>
            <div className="h-20 overflow-hidden"><FontAwesomeIcon icon={faWallet} className="mr-10"/>Connect wallet</div>
          </button> ) :
          (
            <button 
              className={baseStyles.greenBtn + ' z-100'}
              onClick={disconnect}
            >
              <div className="lowercase overflow-hidden h-20">
                <FontAwesomeIcon icon={faWallet} className="mr-10"/>
                {address.slice(0,7)} ..... {address.slice(address.length-5, address.length)}
              </div>
            </button>
          )
      }
    </div>
  );
}
