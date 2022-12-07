import { NavBar } from "../components/Nav";
import LayoutHeader from "./header";

const Layout = (props:any) => {
  return (
    <div>
      <div className="bg-paarl">
        <NavBar />
      </div>
      <LayoutHeader />
      <div>
        {
          props.children
        }
      </div>
    </div>
  )
};

export default Layout;