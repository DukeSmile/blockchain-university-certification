import { Grid, TableCell, Table, TableHead, TableBody, TableRow, Button, TextField, TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useWeb3Context } from '../../core/hooks/web3Context';
import { updateSubjectMark, updateSubjectUnit } from "../../core/app/slices/certificationReducer";
import { getContract } from "../../core/constants/base";
import { processProp, subjectProp, studentInfoProp } from "../../core/interfaces/base";
import LoadingBar from "../../components/loadingbar";

export const WatchCertificationPage = () => {
  const { connect, disconnect, address, provider } = useWeb3Context();
  const dispatch = useDispatch();
  const certProcesses = useSelector((state:any) => state.app.processes);
  const style = {
    label: 'text-18 font-bold'
  };
  return (
    <div>
      {address === '' ? (
        <div>
          Connect to your wallet to check your certification
        </div>
      ) :
      (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <p className={style.label}>Student Name</p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className={style.label}>Student ID</p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className={style.label}>Student Wallet Address</p>
            </Grid>
            <Grid item xs={12}>
              <p className={style.label}>Certification Detail</p>
            </Grid>
          </Grid>
          <Grid container>
            {
              certProcesses.map((process:processProp, index:number) => {
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
                                  {subject.mark}
                                </TableCell>
                                <TableCell align="center">
                                  {subject.unit}
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
      )}
    </div>
  )
}