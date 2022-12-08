import { Grid, TableCell, Table, TableHead, TableBody, TableRow, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateSubjectMark, updateSubjectUnit } from "../../core/app/slices/certificationReducer";
import { processProp, subjectProp } from "../../core/interfaces/base";

export const CertificationPage = () => {
  const dispatch = useDispatch();
  const certProcesses = useSelector((state:any) => state.app.processes);
  const updateMark = (processIndex:number, subjectIndex: number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      sIndex: subjectIndex,
      value: parseInt(value)
    }
    dispatch(updateSubjectMark(updateData));
  }
  const updateUnit = (processIndex:number, subjectIndex: number, value:string) => {
    const updateData = {
      pIndex: processIndex,
      sIndex: subjectIndex,
      value: parseInt(value)
    }
    dispatch(updateSubjectUnit(updateData));
  }

  return (
    <div>
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
      <div className="py-10">
        <Button variant="contained">Make Certification</Button>
      </div>
    </div>
  )
}