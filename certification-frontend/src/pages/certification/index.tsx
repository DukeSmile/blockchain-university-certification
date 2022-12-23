import { Grid, TableCell, Table, TableHead, TableBody, TableRow, Button, TextField, TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/core/styles';

import { useWeb3Context } from '../../core/hooks/web3Context';
import { setUploadFile, updateProcessDetail, updateSubjectMark, updateSubjectUnit } from "../../core/app/slices/certificationReducer";

import { getContract } from "../../core/constants/base";
import { processProp, subjectProp } from "../../core/interfaces/base";
import LoadingBar from "../../components/loadingbar";

const useStyles = makeStyles({
  customTable: {
    "& .MuiTableCell-sizeSmall": {
      padding: "5px 10px" // <-- arbitrary value
    }
  },
});

export const CertificationPage = () => {
  const { connect, disconnect, address, provider } = useWeb3Context();
  const dispatch = useDispatch();
  const certProcessesInfo = useSelector((state:any) => state.app.processes);
  const ipfsInfo = useSelector((state:any) => state.app.ipfs);
  const uploadFile = useSelector((state:any) => state.app.uploadFile);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const updateMark = (processIndex:number, subjectIndex: number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      sIndex: subjectIndex,
      value: value
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
  const updateDetail = (processIndex:number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      value: value
    }
    dispatch(updateProcessDetail(updateData));
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
        //upload image to IPFS
        let uploadUrl = '';
        
        if (ipfsInfo && uploadFile) {
          const result = await (ipfsInfo).add(uploadFile);
          uploadUrl = result.path;
        }
        if (uploadUrl === '') {
          alert("There is no student image");
          throw new Error("There is no student image");
        }
        let certContract = getContract();
        const _catalog = {
          name: values.name,
          photo: uploadUrl,
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
        .send({from: address.toLowerCase()});
        setLoading(false);
        alert("created");
        dispatch(setUploadFile(undefined));
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

  // const LoadTerms = async() => {
  //   try{
  //     const response = await axios.get(`${baseServerUrl}/terms/all`);
  //     const processNames:string[] = [];
  //     const subjectTitles:{[key:string]:string[]} = {};
  //     if (response.data) {
  //       response.data.forEach((record:any) => {
  //         processNames.push(record['title']);
  //         subjectTitles[record['title']] = JSON.parse(record['subjects']);
  //       });
  //     }
  //     dispatch(setCertProcesses(processNames));
  //     dispatch(setCertSubjects(subjectTitles));
  //     buildProcesses(processNames, subjectTitles);
  //   } catch (e:any) {
  //     console.log(e.message);
  //   }
  // };

  // useEffect(() => {
  //   LoadTerms();
  // }, []);

  const style = {
    label: 'text-20 my-15 font-bold',
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
      <Grid container spacing={1}>
        {
          certProcessesInfo.map((process:processProp, index:number) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <div className="w-full h-full border-2">
                  <Table className="w-full text-center" classes={{root: classes.customTable}} size="small">
                    <TableHead className="border-b-2">
                      <TableRow>
                        <TableCell className="w-full font-bold capitalize text-20" align="center">{process.name}</TableCell>
                        <TableCell className="font-bold text-20" align="center">Mark</TableCell>
                        <TableCell className="font-bold text-20" align="center">Unit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        process.subjects.map((subject:subjectProp, pindex) => {
                          return (
                            <TableRow key={pindex}>
                              <TableCell align="center" className="capitalize">{subject.title}</TableCell>
                              <TableCell align="center">
                                <input type="text" className="w-50 p-5 text-center" min={0} value={subject.mark}
                                  onChange={(e) => updateMark(index, pindex, e.target.value)}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <input type="number" className="w-50 p-5 text-center" min={0} value={subject.unit}
                                  onChange={(e) => updateUnit(index, pindex, e.target.value)}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                      <TableRow className="border-t-2">
                        <TableCell align="center" colSpan={3} className="border-b-0">
                          <textarea className="w-full p-5 text-center outline-none" rows={3} value={process.detail}
                            onChange={(e) => updateDetail(index, e.target.value)}
                          />
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
    </div>
  )
}