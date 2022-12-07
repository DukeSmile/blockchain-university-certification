import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { useWeb3Context } from '../../hooks/web3Context';
// import { handleSignMessage, baseServerUrl } from '../../core/constants/base';
// import { setCharityType, setLoginUser, setSignHash } from '../../core/store/slices/bridgeSlice';
// import axios from 'axios';

export const ConnectWalletButton = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeStyle = 'm-5 hover:text-black';
  const ref = useRef<HTMLDivElement | null>(null);
  const address = '';
//   const { connect, disconnect, address, provider } = useWeb3Context();
  const [showMenu, setShowMenu] = useState(false);
  const baseStyles = {
    greenBtn: 'border p-10'
  }
//   const SiginWalletAddress = async () => {
//     setShowMenu(false);
//     if (provider === null) 
//       return;
//     const signHash = await handleSignMessage(address, provider);
//     if (signHash === '')
//       return;
//     dispatch(setSignHash(signHash));
//     let response;
//     try {
//       response = await axios.post(`${baseServerUrl}/auth/login`, {
//         wallet_address: address
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${signHash}`
//         },
//       });
//       console.log("[logined user]", response.data);
//       dispatch(setLoginUser(response.data));
//       dispatch(setCharityType(response.data.charity_type === 0 ? 'charity' : 'fundraiser'));
//     }
//     catch (e: any) {
//       console.log(e);
//     }
//   }
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
          <button className={baseStyles.greenBtn}>
            <div className="h-20 overflow-hidden"><FontAwesomeIcon icon={faWallet} className="mr-10"/>Connect wallet</div>
          </button> ) :
          (
            <></>
          )
      }
    </div>
  );
}
