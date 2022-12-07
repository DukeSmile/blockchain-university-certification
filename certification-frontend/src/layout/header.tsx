import { Grid } from '@material-ui/core';
import universityLogo from '../assets/images/logo.jpg';
import manLogo from '../assets/images/man.png';


const LayoutHeader = () => {
  return (
    <div className="w-[80%] mx-auto text-24 font-bold">
      <Grid container spacing={1} className="flex items-center py-10">
        <Grid item sm={12} md={4}>
          <p>University of Baghdad Colleage of Education Registration</p>
        </Grid>
        <Grid item sm={6} md={4}>
          <div className="flex flex-col items-center">
            <p className="text-center">Republic of Iraq</p>
            <img src={universityLogo} className="w-100 h-100" />
          </div>
        </Grid>
        <Grid item sm={6} md={4}>
          <div className="flex justify-center">
            <img src={manLogo} className="w-200 h-200 border"/>
          </div>
        </Grid>
      </Grid>
      <hr />
    </div>
  )
}

export default LayoutHeader;