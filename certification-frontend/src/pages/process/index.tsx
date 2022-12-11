import { faClose, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@material-ui/core"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCertProcess, updateCertProcess, addCertSubject, setCertProcesses, deleteCertSubject } from "../../core/app/slices/certificationReducer";
import { baseServerUrl } from "../../core/constants/base";

export const ProcessManage = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false);
  const [processName, setProcessName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [processText, setProcessText] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const certProcesses = useSelector((state:any) => state.app.certProcesses);
  const certProcessIds = useSelector((state:any) => state.app.certProcessIds);
  const certSubjects = useSelector((state:any) => state.app.certSubjects);
  const termAction = async() => {
    if (processName === '') {
      alert("Input process name!");
      return;
    } 
    if (editFlag) {
      if (processText != processName)
        dispatch(updateCertProcess({ former: processText, value: processName }));
      setEditFlag(false);
      setProcessName('');
      setProcessText('');
    }
    else {
      try {
        const ajax_body = {
          title: processName,
          subjects: JSON.stringify([])
        };
        const response = await axios.post(`${baseServerUrl}/terms/create`, ajax_body);
        console.log('New process is created');
        dispatch(addCertProcess(processName));
        alert('New process is created!')
      }
      catch (e:any) {
        console.log(e.message);
      }
    }
  }

  const subjectAction = () => {
    if (subjectName === '') {
      alert("Input subject title!");
      return;
    } 
    if (processText != '' && editFlag) {
      dispatch(addCertSubject({ process:processText, value: subjectName }));
    }
    setSubjectName('');
  }

  const deleteSubject = (process:string, subject:string) => {
    dispatch(deleteCertSubject({process: process, subject:subject}));
  }

  const saveProcessToBackend = async(process: string) => {
    try {
      const ajax_body = {
        id: certProcessIds[process],
        title: process,
        subjects: JSON.stringify(certSubjects[process])
      };
      const response = await axios.patch(`${baseServerUrl}/terms`, ajax_body);
      // console.log('term is udpated');
      alert('This process is saved!');
    }
    catch (e:any) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <Grid container className="text-16" spacing={2}>
        <Grid item xs={12} sm={6} className="flex items-center flex-between">
          <label className="font-bold w-150">Process Name : </label>
          <TextField
            id="name"
            name="name"
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
            autoComplete='off'
            variant="outlined"
            placeholder="Enter Process Name"
            size="small"
          />
          <button className="border px-10 py-5 rounded-5" onClick={termAction}>
            { editFlag ? 'Update' : 'Add' }
          </button>
        </Grid>
        <Grid item xs={12} sm={6}>
          { editFlag && (
            <div className="flex items-center">
              <label className="font-bold w-150">Subject Title : </label>
              <TextField
                id="name"
                name="name"
                type="text"
                value= {subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                autoComplete='off'
                variant="outlined"
                placeholder="Enter Process Name"
                size="small"
              />
              <button className="border px-10 py-5 rounded-5 w-50 "
              onClick={subjectAction}>Add</button>
            </div>
          )}
        </Grid>
        <Grid item xs={12}><hr/></Grid>
        <Grid item xs={12}>
          {
            certProcesses.map((process:string, index:number) => {
              return (
                <div key={index}>
                  <div className="flex items-center">
                    <p className="font-bold mr-10 text-24">{process}</p>
                    <button className="m-10" onClick={() => {
                      setEditFlag(true);
                      setProcessName(process);
                      setProcessText(process);
                    }}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button className="m-10" onClick={() => saveProcessToBackend(process)}>
                      <FontAwesomeIcon icon={faSave}/>
                    </button>
                  </div>
                  <div className="flex flex-wrap">
                    {
                      certSubjects[process]?.map((subject:string, index:number) => {
                        return (
                          <div key={index} className="border px-10 py-5 m-10">
                            {subject}
                            {
                              process === processText && (
                                <FontAwesomeIcon icon={faClose} className="mx-10 cursor-pointer" onClick={() => deleteSubject(process, subject)}/>
                              )
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </Grid>
        <Grid item xs={12}><hr/></Grid>
      </Grid>
    </div>
  )
}