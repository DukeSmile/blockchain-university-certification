import { Grid, TableCell, Table, TableHead, TableBody, TableRow, Button, TextField, TextareaAutosize } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useWeb3Context } from '../../core/hooks/web3Context';
import { initProcesses, updateSubjectUnit, initStudentInfo } from "../../core/app/slices/certificationReducer";
import { getContract } from "../../core/constants/base";
import { processProp, subjectProp, studentInfoProp } from "../../core/interfaces/base";
import LoadingBar from "../../components/loadingbar";


export const WatchOtherCertificationPage = () => {
  const { connect, disconnect, address, provider } = useWeb3Context();
  const dispatch = useDispatch();
  const [studentAddr, setStudentAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const studentDetail = useSelector((state:any) => state.app.student_info);
  const style = {
    label: 'text-18 font-bold mr-10'
  };

  const getCertification = async () => {
    // dispatch(initProcesses([]));
    dispatch(initStudentInfo({}));
    if (address === '') {
      alert("Connect to your wallet first!");
      return;
    }
    let certContract = getContract();
    try {
      const certification = await certContract.methods.getCertification(studentAddr, address).call();
      const processInfo:processProp[] = [];
      certification['processes'].forEach((process:string) => {
        const processJson = JSON.parse(process);
        processInfo.push(processJson);
      });

      const studentInfo = {
        wallet_address: certification['wallet_address'],
        name: certification['catalog']['name'],
        photo: certification['catalog']['photo'],
        student_id: certification['catalog']['id'],
        detail: certification['catalog']['detail'],
        date: certification['date'],
        process: processInfo
      };
      console.log(processInfo);
      dispatch(initStudentInfo(studentInfo));
    }
    catch(e:any){
      alert(e.message);
    } 
    setStudentAddr('');
  };

  const giveAccess = async () => {
    if (address === '') {
      alert("Connect to your wallet first!");
      return;
    }
    
    setLoading(true);
    let certContract = getContract();
    try {
      await certContract.methods.giveAccess(studentAddr.toLowerCase()).send({from: address.toLowerCase()});
    } catch(e:any) {
      alert(e.message);
    }
    setLoading(false);
    setStudentAddr('');
  };

  useEffect(()=>{
    dispatch(initStudentInfo({}));
  }, []);
  return (
    <div>
      <LoadingBar open={loading} />
      <div className="my-10">
        <label className="mr-10">Student WalletAddress:</label>
        <input type="text" className="p-5 border mx-5 w-350" value={studentAddr} onChange={(e) => setStudentAddr(e.target.value)}/>
        <button className="p-5 border rounded-5 mx-5 hover:bg-sunshade" onClick={getCertification}>Display</button>
        <button className="p-5 border rounded-5 mx-5 hover:bg-sunshade" onClick={giveAccess}>Give Access</button>
      </div>
      { Object.keys(studentDetail).length === 0 && (
        <div>
          <p>You don't have access to this certification or there is no certification for this address.</p>
        </div>
      )}
      { Object.keys(studentDetail).length != 0 && (
        <div>
          <Grid container spacing={2} className="text-20">
            {/* <Grid item xs={12} sm={6} md={4}>
              <p className={style.label}>Student Name</p>
              {studentDetail['name']}
            </Grid> */}
            <Grid item xs={12}>
              <label className={style.label}>NO :</label>
              {studentDetail['student_id']}
            </Grid>
            <Grid item xs={12}>
              <label className={style.label}>ADDRESS :</label>
              {studentDetail['wallet_address']}
            </Grid>
            <Grid item xs={12}>
              <label className={style.label}>DATE :</label>
              {studentDetail['date']}
            </Grid>
            <Grid item xs={12}>
              <hr className="h-5"/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} className="text-20">
              <div>This is certification of the University of Baghdad for <span className="font-bold">{studentDetail['name']}.</span></div>
              {
                studentDetail['detail'].split('\n').map((detail: string, index: number) => {
                  return (
                    <div key={index}>{detail}</div>
                  )
                })
              }
            </Grid>
            {
              studentDetail['process']?.map((process:processProp, index:number) => {
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <div className="w-full h-full border-2">
                      <Table className="w-full text-center">
                        <TableHead className="border-b-2 ">
                          <TableRow>
                            <TableCell className="w-fullfont-bold capitalize" align="center">{process.name}</TableCell>
                            <TableCell className="font-bold" align="center">Mark</TableCell>
                            <TableCell className="font-bold" align="center">Unit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            process.subjects.map((subject:subjectProp, pindex) => {
                              return (
                                <TableRow key={pindex}>
                                  <TableCell align="center" className="capitalize">{subject.title}</TableCell>
                                  <TableCell align="center">
                                    {subject.mark}
                                  </TableCell>
                                  <TableCell align="center">
                                    {subject.unit}
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          }
                          <TableRow className="border-t-2">
                            <TableCell colSpan={3} className="border-b-0">
                              {
                                process['detail']?.split('\n').map((detail:string, index:number) => {
                                  return (
                                    <div>{detail}</div>
                                  )
                                })
                              }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Grid>
                )
              })
            }
          </Grid>
          <div>
          </div>
        </div>
      )}
    </div>
  )
}