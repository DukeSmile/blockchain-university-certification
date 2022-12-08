import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { initProcesses } from "../../core/app/slices/certificationReducer";
import { useWeb3Context } from '../../core/hooks/web3Context';
import { getContract } from '../../core/constants/base';
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
    if (address === '') {
      dispatch(initProcesses([]));
      return;
    }
    const getCertification = async () => {
      let certContract = getContract();
      try {
        const certification = await certContract.methods.getCertification().call();
        console.log(certification);
      }
      catch(e:any){
        console.log(e.message);
      } 
    };
    getCertification();
  }, [address]);
//   useEffect(() => {
//     const listener = (event: MouseEvent) => {
//       if (
//         ref.current &&
//         event.target &&
//         ref.current.contains(event.target as Node)
//       ) {
//         return;
//       }
//       setShowMenu(false);
//     };
//     document.addEventListener("click", listener, { capture: true });
//     return () => {
//       document.removeEventListener("click", listener, { capture: true });
//     };
//   }, []);

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
