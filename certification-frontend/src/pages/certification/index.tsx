import { Grid, TableCell, Table, TableHead, TableBody, TableRow, Button, TextField, TextareaAutosize } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useWeb3Context } from '../../core/hooks/web3Context';
import { updateSubjectMark, updateSubjectUnit, initProcesses } from "../../core/app/slices/certificationReducer";

import { getContract, certProcesses, certSubjects } from "../../core/constants/base";
import { processProp, subjectProp, studentInfoProp } from "../../core/interfaces/base";
import LoadingBar from "../../components/loadingbar";

export const CertificationPage = () => {
  const { connect, disconnect, address, provider } = useWeb3Context();
  const dispatch = useDispatch();
  const certProcessesInfo = useSelector((state:any) => state.app.processes);
  const [loading, setLoading] = useState(false);
  const updateMark = (processIndex:number, subjectIndex: number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      sIndex: subjectIndex,
      value: parseInt(value)
    }
    dispatch(updateSubjectMark(updateData));
  };
  const updateUnit = (processIndex:number, subjectIndex: number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      sIndex: subjectIndex,
      value: parseInt(value)
    }
    dispatch(updateSubjectUnit(updateData));
  };

  const getDateFormat = () => {
    const cDate = new Date();
    return cDate.getFullYear() + '-' + cDate.getUTCMonth() + '-' + cDate.getUTCDate() + ' ' + cDate.getUTCHours() + ':' + cDate.getUTCMinutes() + ':' + cDate.getUTCSeconds();
  };

  const createCertification = async(values:any) => {
    if (address === '')
      alert('Connect wallet');
    if (address !== '' && provider != null) {
      setLoading(true);
      try{
        let certContract = getContract();
        const _catalog = {
          name: values.name,
          photo: '',
          id: values.student_id,
          detail: values.detail
        }
        const processInfo:string[] = [];
        certProcessesInfo.forEach((cProcess:processProp) => {
          processInfo.push(JSON.stringify(cProcess));
        });
        await certContract.methods.generateCertification(values.student_wallet.toLowerCase(),
          getDateFormat(),
          processInfo,
          _catalog)
        .send({from: address});
        setLoading(false);
        alert("created");
      }
      catch(e:any){
        console.log(e.message);
        setLoading(false);
      }
    }
  };

  const formValidation = Yup.object().shape({
    name: Yup.string().required("Required"),
    student_id: Yup.string().required("Required"),
    student_wallet: Yup.string().required("Required"),
    detail: Yup.string().required("Required")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_wallet: '',
      name: '',
      student_id: '',
      detail: ''
    },
    onSubmit: createCertification,
    validationSchema: formValidation
  });

  const buildProcesses = () => {
    let processes:processProp[] = [];
    certProcesses.map((term:any) => {
      let process:processProp = { name: '', subjects: [], detail: 'Finished successful' };
      process['name'] = term;
      certSubjects[term].map((subject:string) => {
        let subjectRecord = { title: subject, mark: 5, unit: 1 };
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

  const style = {
    label: 'text-18 my-15',
    tab: 'rounded-full py-6 px-20 text-20 text-brown',
    activeTab: 'rounded-full py-6 px-20 text-20 bg-asphalt text-white font-bold'
  }
  return (
    <div>
      <LoadingBar open={loading} />
      <form className="w-full py-10 mb-20" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <p className={style.label}>Student Name</p>
            <TextField
              fullWidth
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
              autoComplete='off'
              variant="outlined"
              placeholder="Enter Student Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p className={style.label}>Student ID</p>
            <TextField
              fullWidth
              id="student_id"
              name="student_id"
              type="text"
              value={formik.values.student_id}
              onChange={formik.handleChange}
              error={formik.touched.student_id && Boolean(formik.errors.student_id)}
              inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
              autoComplete='off'
              variant="outlined"
              placeholder="Enter Student ID"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p className={style.label}>Student Wallet Address</p>
            <TextField
              fullWidth
              id="student_wallet"
              name="student_wallet"
              type="text"
              value={formik.values.student_wallet}
              onChange={formik.handleChange}
              error={formik.touched.student_wallet && Boolean(formik.errors.student_wallet)}
              inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
              autoComplete='off'
              variant="outlined"
              placeholder="Enter Student Wallet Address"
            />
          </Grid>
          <Grid item xs={12}>
            <p className={style.label}>Certification Detail</p>
            <TextareaAutosize
              minRows={4}
              maxRows={4}
              id="detail"
              name="detail"
              className={"border-1 p-10 " + (formik.touched.detail && Boolean(formik.errors.detail) ? "border-error" : '' )}
              style={{ width: '100%' }}
              value={formik.values.detail}
              onChange={formik.handleChange}
              placeholder="Enter your certification detail"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <button type="submit" className="border px-20 py-5 rounded-5">Create Certification</button>
          </Grid>
        </Grid>
      </form>
      <Grid container>
        {
          certProcessesInfo.map((process:processProp, index:number) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Table className="w-full border-2 text-center">
                  <TableHead>
                    <TableRow>
                      <TableCell className="w-full border-2 font-bold capitalize" align="center">{process.name}</TableCell>
                      <TableCell className="border-2 font-bold" align="center">Mark</TableCell>
                      <TableCell className="border-2 font-bold" align="center">Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      process.subjects.map((subject:subjectProp, pindex) => {
                        return (
                          <TableRow key={pindex}>
                            <TableCell align="center" className="capitalize">{subject.title}</TableCell>
                            <TableCell align="center">
                              <input type="number" className="w-50 p-5" min={0} value={subject.mark}
                                onChange={(e) => updateMark(index, pindex, e.target.value)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <input type="number" className="w-50 p-5" min={0} value={subject.unit}
                                onChange={(e) => updateUnit(index, pindex, e.target.value)}
                              />
                              </TableCell>
                          </TableRow>
                        )
                      })
                    }
                    <TableRow className="border-2 border-t-0">
                      <td colSpan={3}>Finished Successful</td>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}