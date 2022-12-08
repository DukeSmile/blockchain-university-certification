import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initProcesses } from "../app/slices/certificationReducer";
import { NavBar } from "../components/Nav";
import { certProcesses, certSubjects } from "../core/constants/base";
import { processProp, subjectProp } from "../core/interfaces/base";
import LayoutHeader from "./header";

const Layout = (props:any) => {
  const dispatch = useDispatch();

  const buildProcesses = () => {
    let processes:processProp[] = [];
    certProcesses.map((term, index) => {
      let process:processProp = { name: '', subjects: [] };
      process['name'] = term;
      certSubjects[term].map((subject:string) => {
        let subjectRecord = { title: subject, mark: 0, unit: 1 };
        process['subjects'].push(subjectRecord);
      });
      processes.push(process);
    });
    console.log(processes);
    dispatch(initProcesses(processes));
  };
  
  useEffect(() => {
    buildProcesses();
  }, []);

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