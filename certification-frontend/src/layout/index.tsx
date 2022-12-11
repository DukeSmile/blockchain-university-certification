import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavBar } from "../components/Nav";
import { processProp, subjectProp } from "../core/interfaces/base";
import LayoutHeader from "./header";
import { FromNetwork } from "../networks"; 
import { useWeb3Context } from '../core/hooks/web3Context';
import { baseServerUrl } from "../core/constants/base";
import { setCertProcesses, setCertSubjects, initProcesses, setCertProcessIds } from "../core/app/slices/certificationReducer";

const Layout = (props:any) => {
  const dispatch = useDispatch();
  const { switchEthereumChain } = useWeb3Context();
  const certProcesses = useSelector((state:any) => state.app.certProcesses);
  const certSubjects = useSelector((state:any) => state.app.certSubjects);

  const buildProcesses = (cProcesses:any, cSubjects:any) => {
    let processes:processProp[] = [];
    cProcesses.map((term:any) => {
      let process:processProp = { name: '', subjects: [], detail: 'Finished successful' };
      process['name'] = term;
      cSubjects[term].map((subject:string) => {
        let subjectRecord = { title: subject, mark: 5, unit: 1 };
        process['subjects'].push(subjectRecord);
      });
      processes.push(process);
    });
    dispatch(initProcesses(processes));
  };
  
  const LoadTerms = async() => {
    try{
      const response = await axios.get(`${baseServerUrl}/terms/all`);
      const processNames:string[] = [];
      const processIds:{[key:string]:string} = {};
      const subjectTitles:{[key:string]:string[]} = {};
      if (response.data) {
        response.data.forEach((record:any) => {
          processNames.push(record['title']);
          subjectTitles[record['title']] = JSON.parse(record['subjects']);
          processIds[record['title']] = record['id'];
        });
      }
      dispatch(setCertProcesses(processNames));
      dispatch(setCertSubjects(subjectTitles));
      dispatch(setCertProcessIds(processIds));
      buildProcesses(processNames, subjectTitles);
    } catch (e:any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    const checkFromNetwork = async () => {
      await switchEthereumChain(FromNetwork, true);
    };
    checkFromNetwork();
    LoadTerms();
  }, [])
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