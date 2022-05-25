import PropTypes from 'prop-types';
import { Grid,Button,Box ,Popover,Card,Typography,TextField,FormHelperText,Link, Table,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CircularProgress,
  TableRow,} from '@material-ui/core';
import ProjectApplicantCard from './ProjectApplicantCard';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import PlusIcon from '../../../icons/Plus';
import { Link as RouterLink } from 'react-router-dom';
import { useState,useRef,useEffect,useCallback } from 'react';
import * as Yup from "yup";
import { Formik, setNestedObjectValues } from "formik";
import toast from "react-hot-toast";
import useAuth from '../../../hooks/useAuth';
import Amplify,  { Auth ,API} from 'aws-amplify';
import cognitoActions from 'aws-amplify';
import { projectsApi} from "../../../api/projects";
//import config from '../../../config'
//import awsconfig from './aws-exports';
import jwt from 'jwt-decode';
import useMounted from '../../../hooks/useMounted';
//import awsconfig from './aws-exports';
//Amplify.configure(awsconfig);

//Amplify.configure(awsconfig);
//let groupName;
//Auth.currentAuthenticatedUser().then(user=>groupName=user.signInUserSession.idToken.payload['cognito:groups'][0])
//console.log("newGroupname",groupName)
const ProjectApplicants = (props) => {
  const { handleRender1,params,applicants,project, ...other } = props;
 console.log("project",project)
 console.log("params",params)
  const anchorRef = useRef(null);
  let Domain;
  
    const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const timer = useRef();
  const [success, setSuccess] = useState(false);
   const [copySuccess, setCopySuccess] = useState('');
   const[render,setRender]=useState(false)
  const textAreaRef = useRef(null);
  const mounted = useMounted();
  const[res,setRes]=useState([]);
   const[res2,setRes2]=useState([]);
   const[res3,setRes3]=useState([]);
   const[userName,setUserName]=useState('');
   const[Email,setEmail]=useState('');
   const[index,setIndex]=useState('');
   const[domainName,setDomainName]=useState('');
   const[domainName2,setDomainName2]=useState('');
   const[UserId,setUserName1]=useState(project.userId);
   const[userGroup,setUserGroupe]=useState([]);
   //Amplify.configure(config.amplifyConfig);
  //const express = require('express');
  const[users,setUsers]=useState([]);
  var parser = require('tld-extract');
  
 let email;


  const listEditors1 = useCallback(async (limit) => {

  if (mounted.current) {
      let apiName = 'AdminQueries';
  let path = '/listUsers'; //listUsersInGroup
  let myInit = { 
      queryStringParameters: {
       // "groupname": "Admins",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  let array1=rest.Users;
 let email1=userName;
   let index1=email1.indexOf(('@'))
   
   let domain1=email1.substring(index1+1);
 
  setDomainName(domain1)
  for(let i in array1){
   // let element =rest.Users
//setDomainName(rest.Users[i].Attributes[2].Value.substring(rest.Users[i].Attributes[2].Value.indexOf(('@'))+1));


   let email=rest.Users[i].Attributes[2].Value;
   let index=email.indexOf(('@'))
 
   let domain=email.substring(index+1)
  setDomainName(domain)

 //setRes(rest)
     //  setOpen1(true);
    
 
}
        setRes3(rest);
  return rest;
      }
  

  }, [mounted]);
//Auth.currentAuthenticatedUser().then(user=>setUserGroupe(user.signInUserSession.idToken.payload['cognito:groups'][0]));

 useEffect(() => {
    listEditors1();
  }, [listEditors1]);


let nextToken;
let User;
Auth.currentAuthenticatedUser().then(user=>setUserName(user.signInUserSession.idToken.payload.email));
Auth.currentAuthenticatedUser().then(user=>setUserName1(user.username));

async function listEditors(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsers'; //listUsersInGroup
  let myInit = { 
      queryStringParameters: {
       // "groupname": "Admins",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  let array1=rest.Users;
 let email1=userName;
   let index1=email1.indexOf(('@'))
 
   let domain1=email1.substring(index1+1);
   
  setDomainName2(domain1)
  for(let i in array1){
   // let element =rest.Users
//setDomainName(rest.Users[i].Attributes[2].Value.substring(rest.Users[i].Attributes[2].Value.indexOf(('@'))+1));

 
   let email=rest.Users[i].Attributes[2].Value;
   let index=email.indexOf(('@'))
  
   let domain=email.substring(index+1)
  setDomainName(domain)



 setRes(rest)
    listEditors1()
 console.log("respo",rest)
       setOpen1(true);

  return rest;



  }
 
}


//Auth.currentAuthenticatedUser().then(user=>setUserGroupe(user.signInUserSession.idToken.payload['cognito:groups'][0]));

async function addUserToGroup(username,groupname){
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup'; //listUsersInGroup
  let myInit = { 
      queryStringParameters: {
        "groupname": "Admins",
        "username": userName,
       
      },
      body:{
"groupname": "Admins",
        "username": userName,
       

      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.post(apiName, path, myInit);
  nextToken = NextToken;
     
  

 
     setRes2(rest)
 
  return rest;
 
 
}
//addUserToGroup

function sendMail(value) {
    var link = "mailto:me@example.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + encodeURIComponent("This is my subject")
             + "&body=" + encodeURIComponent(document.getElementById('myText').value)
    ;
    
    window.location.href = link;
}

 const handleRender = () => {
  setRender(true);
  handleRender1();
  console.log("hi")
  };

//let userId=project.userId;




  function copyToClipboard(e) {
 navigator.clipboard.writeText('https://dashboard.northcode.dev/');
// listEditors(10);


   // setOpen1(true);
   addUserToGroup(userName,userGroup);
    toast.success("Copied!");
  };

function handleOpen1 (e)  {
   listEditors(10);
    listEditors1()
 
  
    
  };

  function handleAdd (e)  {
  addUserToGroup(userName,userGroup);
 
 
  
    
  };

   const handleClose = () => {
    setOpen(false);
 
  };

  const handleClose2 = () => {
    setOpen1(false);
  };
    useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleClick = () => {
   
    if (!isOpen) {
      setSuccess(false);
      setisOpen(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setisOpen(false);
        setOpen(true);
      }, 2000);
    }
  
  };
 
  
  return (
         <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                    onClick={() => {
                  setOpen(true);
                   }}
                  ref={anchorRef}
                  variant="contained"
                >
                  Add members
                </Button>

                  <Popover
          anchorEl={anchorRef}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={handleClose}
          open={open}
        >
             <Formik
            initialValues={{
              userId:Yup.array(),
             // Invite: project.Invite,
              //Email:project.Email,
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              Invite: Yup.string()
              ,
              tags: Yup.string(),
              Location: Yup.string().required(),
              projectPhone: Yup.number().required(
                "Number to call is a required field"
              ),
              startDate: Yup.date().required("Date is required"),
             type: Yup.string(),
              Email: Yup.string(),
              endDate: Yup.date().required("Date is required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                // Call API to store step data in server session
                // It is important to have it on server to be able to reuse it if user
                // decides to continue later.

                
                toast.success("Project Updated");
                handleClose();

                // window.location.reload();
                setStatus({ success: true });
                setSubmitting(false);

             
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit} {...other}>
                <Card sx={{ p: 3 }}>
                  <Typography color="textPrimary" variant="h6">
                  
                  </Typography>

                  <Box sx={{ mt: 2,width:50 }} />
                <Link
  component="button"
  variant="body2"
  underline="always"
  type="submit"
  onClick={() => {
            setisOpen(true);
        
          }}
>
  Invite With Link 
</Link>

               {isOpen ?(
                <Box sx={{ mt: 2 }} >
<Button
                  color="primary"
                  
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  onClick={() =>  copyToClipboard() }
                  ref={anchorRef}
                  variant="contained"
                >
                  Copy Link
                </Button>


                <Button
                  color="primary"
                  
                  
                  sx={{ m: 1 }}
                  onClick={() =>  {setisOpen(false); }}
                  ref={anchorRef}
                  variant="contained"
                >
                  Cancel
                </Button>
</Box>
               )
               :(

""
               )
               
               
               
               
               
               }

                {/*   <Box sx={{ mt: 2 }} />
                  <TextField
                    error={Boolean(touched.Email && errors.Email)}
                    fullWidth
                    helperText={touched.Email && errors.Email}
                    label="Email Adress"
                    name="Email"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      project.Email = e.target.value;
                      values.Email = e.target.value;
                      setFieldValue("Email", e.target.value);

                    }}
                    value={values.Email}
                    variant="outlined"
                  />

                  <Button
                  color="primary"
                  
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  onClick={(e) =>  sendMail(e.target.value)}
                  ref={anchorRef}
                  variant="contained"
                >
                  Invite
                </Button> */}

                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      mt: 2,
                    }}
                  ></Box>
                  <Box sx={{ mt: 2 }} />

                

                  <Box sx={{ mt: 2 }} />
               
                  <Button
                  color="primary"
                  
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  onClick={() =>  {handleOpen1();  } }
                  
                  ref={anchorRef}
                  variant="contained"
                >
                  Add an existing user
                </Button>

{open1?(

 <Box >
          <Table>
          
            <TableHead>
           
              <TableRow
              
             
              
              >
               
        
                 
                <TableCell ><Typography color="primary" variant="body2"> User Name</Typography></TableCell>
             
          
              </TableRow>
            </TableHead>
            <TableBody>
            
                 {res.Users.map((user) => (
 user.Attributes.map((email) => (
          
  email.Value.substring(email.Value.indexOf(('@'))+1)===domainName2?(
     project.userId.includes(user.Username) ?(
 ""
  ):(
                <TableRow
                key={user.Username}
                
                >
            
                 {email.Name==='name'?(
                   <TableCell >{email.Value.substring(email.Value.indexOf(('@'))-1)}</TableCell>
            ):(
<TableCell >{email.Value.substring(0,email.Value.indexOf(('@')))}</TableCell>)}



                      <Button
                      key={user.Username}
                  color="primary"
                  
                  startIcon={<PlusIcon fontSize="small" sx={{ml:1.5}}/>}
                  sx={{ ml: -3,mt:1,maxWidth: '10px' ,minWidth: '5px'}}
                  onChange={(e) => {
                      values.userId = e.target.value;
                      setFieldValue("Project Name", e.target.value);
                      user.Username = e.target.value;
                    }}
                    variant="outlined"
                    value={values.userId}
                    onClick={() =>  {//setUserName(user.Username);
                   
                    
                   
                    project.userId.push(user.Username)
  // setUserName1(project.userId)
  // console.log("user",userr);
   
    const projectt = {
      
      userId:project.userId,
     
      id: project.id,
      name: project.name,
      tags: project.tags,
      projectPhone: project.projectPhone,
      startDate: project.startDate,
      type: project.type,
      endDate: project.endDate,
      description: project.description
  
   
    };
    
    toast.success("Member added");
      
                handleClose();
          
    return projectsApi.updateProject(projectt);}}
                  ref={anchorRef}
                  
                >
                  
                </Button>
                
                </TableRow>) 
                
                
                 ) :("") 
                
           



                  )) ))}
                    
            </TableBody>
             
              

          </Table>
           <Button
                        color="primary"
                        onClick={handleClose2}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
        </Box>

):(

  ""
)




}

              


                  <Box sx={{ mt: 2 }}>
                   
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 6,
                    }}
                  >
                    <Box sx={{ m: 1, justifyContent: "center" }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        onClick={() =>  {handleAdd() }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ m: 1 }}>
                      <Button
                        color="primary"
                        onClick={handleClose}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </form>
            )}
          </Formik>
        </Popover>
           
              
              
 {res3.Users?(         
    <Grid
      container
    
      spacing={3}
      {...other}
    >
          {res3.Users.map((user) => (
        
          
       
           

           project.userId.includes(user.Username) ?(

   
        <Grid
          item
          key={user.Username}
          lg={4}
          xs={12}
        >
          <ProjectApplicantCard
            project={project}
            avatar={user.avatar}
            cover={user.cover}
            name={user.name}
            skills={user.Attributes}
            userName={user.Username}
            params={params}
            handleRender={handleRender}
          />
        </Grid>
           ):("")
     ))}
     
    </Grid>):("")} 
 
    </Box>
  );
};

ProjectApplicants.propTypes = {
  applicants: PropTypes.array.isRequired
};

export default ProjectApplicants;
