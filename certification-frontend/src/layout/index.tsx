import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavBar } from "../components/Nav";
import { processProp, subjectProp } from "../core/interfaces/base";
import LayoutHeader from "./header";

const Layout = (props:any) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-paarl">
        <NavBar />
      </div>
      <LayoutHeader />
      <div className="w-[80%] mx-auto py-20">
        {
          props.children
        }
      </div>
    </div>
  )
};

export default Layout;