import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import universityLogo from '../assets/images/logo.jpg';
import manLogo from '../assets/images/man.png';
import { PhotoUpload } from '../components/photoUpload';
import { setUploadFile } from '../core/app/slices/certificationReducer';

const LayoutHeader = () => {
  const dispatch = useDispatch();
  const [loadimg, setLoadimg] = useState(false);
  const [studentLogo, setStudentLogo] = useState('');
  const studentInfo = useSelector((state:any) => state.app.student_info);
  const uploadFile = useSelector((state:any) => state.app.uploadFile);
  const userRole = useSelector((state:any) => state.app.role);
  const location = useLocation();
  useEffect(() => {
    let imgUrl = manLogo;
    if (location.pathname === '/') {
      imgUrl = (studentInfo.photo === '' || studentInfo.photo === undefined) ? manLogo : ("https://ipfs.io/ipfs/" + studentInfo.photo);
    }
    if (location.pathname === '/create') {
      imgUrl = uploadFile ? URL.createObjectURL(uploadFile) : manLogo;
    }
    if (location.pathname === '/check') {
      imgUrl = (studentInfo.photo === '' || studentInfo.photo === undefined) ? manLogo : "https://ipfs.io/ipfs/" + studentInfo.photo;
    }
    setStudentLogo(imgUrl);
  },[location.pathname, uploadFile, studentInfo]);
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
            <img src={studentLogo} className="w-200 h-200 border  cursor-pointer"
              onClick={() => {
                if (userRole === 1 && location.pathname === '/create') {
                  setLoadimg(true);
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
      <hr />
      <PhotoUpload open={loadimg} 
        handleClose={() => setLoadimg(false)} 
        onChange = {(event:any) => {
          event.preventDefault();
          const files = event.target.files;
          if (!files || files.length === 0) {
            return alert("No files selected");
          }
          const file = files[0];
          dispatch(setUploadFile(file));
          setLoadimg(false);
      }}
      />
    </div>
  )
}

export default LayoutHeader;