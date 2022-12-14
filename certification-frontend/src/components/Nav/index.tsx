import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConnectWalletButton } from "./connectWallet";
export const NavBar = () => {
  const userRole = useSelector((state:any) => state.app.role);
  const menuStyle = 'px-10 py-5 mx-5 rounded-5 border border-transparent hover:border-white';
  return (
    <div className="w-[80%] mx-auto text-16 font-bold border-b-1 h-50 flex justify-between items-center">
      <div>
        <Link to="/" className={menuStyle}>My certification</Link>
        <Link to="/check" className={menuStyle}>Look certification</Link>
        {
          userRole === 1 && (
            <Link to="/create" className={menuStyle}>Registry</Link>
          )
        }
        {
          userRole === 1 && (
            <Link to="/process" className={menuStyle}>Edit Process</Link>
          )
        }
      </div>
      <ConnectWalletButton />   
    </div>
  );
}