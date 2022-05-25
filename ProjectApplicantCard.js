import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Link,
  Typography,
  Button
} from '@material-ui/core';
import { useState,useRef,useCallback,useMounted,useEffect } from 'react';
import  {Storage} from "aws-amplify";
import toast from "react-hot-toast";
import { projectsApi} from "../../../api/projects";

const ProjectApplicantCard = (props) => {
const {handleRender,project, avatar, cover, name,userName,params, skills, ...other } = props;
 const [picture,setPicture]=useState('');
 const [open, setOpen] = useState(false);
 const anchorRef = useRef(null);


const[project1,setProject]=useState([])
 const handleClose = () => {
  setOpen(false);

};

const getProject = useCallback(async () => {
  try {
    const data = await projectsApi.getProject(params.projectId);
    console.log("data",data)
  
      setProject(data);
    
  } catch (err) {
    console.error(err);
  }
}, []);



   function arrayRemove(arr, value) { 
  
  
    return arr.filter(function(ele){ 
        return ele !== value; 
    });
};

const updateProject = async () => {
  //getUser();
  let result=arrayRemove(project.userId,userName)
     const projectt = {
       //userId: project.userId,
 
       userId:result,
       id: project.id,
       name: project.name,
       tags: project.tags,
       projectPhone: project.projectPhone,
       startDate: project.startDate,
       type: project.type,
       endDate: project.endDate,
       description: project.description
   //email.Value.substring(0,email.Value.indexOf(('@')))
    
     };
     toast.success("Member Removed");
                 //handleClose();
                 handleRender();
     return await (projectsApi.updateProject(projectt));
   };
console.log(userName)

  return (
    
    <Card {...other}>

      <CardMedia
        image={cover}
        sx={{ height: 100 }}
      /> 
      <CardContent sx={{ pt: 0}}>
      <Box >
        <Button
       component={RouterLink}
       to="#"
            sx={{
              mt:-20,
              ml:-1,
              //display:'flex',
              
              justifyContent: 'right',
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
           
            variant="contained"
            onClick = {()=>{
             
            
                updateProject()
                getProject()
                setOpen(true)
               
              
            
            
            }}
            ref={anchorRef}
          >
            Remove 
          </Button>
          </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            mt: '-50px'
          }}
        > {skills.map((skill) => (
          
          skill.Name==='picture'?(
         
          <Avatar
          key={skill.Value}
            alt="Applicant"
            component={RouterLink}
            
            src={  Storage.get(skill.Value,{
    level: 'public'}).then(data =>setPicture(data),

    ),picture
    }
            sx={{
              border: '3px solid #FFFFFF',
              height: 100,
              width: 100
            }}
            to="#"
          />):(skill.Name===''? (  <Avatar
            
            sx={{
              height: 100,
              width: 100
            }}> 
          </Avatar> ):("")

          )))}
        </Box>
        {skills.map((skill) => (
         
         
         
        project.userId.includes(userName)&&skill.Name==='name'?(
         console.log("no"),
          <Link
            align="center"
            color="textPrimary"
            component={RouterLink}
            display="block"
            to="#"
            underline="none"
            variant="h6"
          >
            {skill.name}
          </Link>):("")





        )
          )}
             {skills.map((skill) => (
                    
          skill.Name==='name'?(
        <Typography
       
     
         
 
        >
          {skill.Value}
 
        </Typography>
            ):("")
          ))}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ m: -0.5 }}>
       {skills.map((skill) => (
          // skill.Value.includes(" ")?(
          skill.Name==='email'?(
            <Chip
              key={skill.Value}
              label={skill.Value}
              sx={{ m: 0.5 }}
              variant="outlined"
            />):("")
       ))}
        </Box>
  
      </CardContent>
   
    </Card>
  );
};

ProjectApplicantCard.propTypes = {
  //avatar: PropTypes.string.isRequired,
 // cover: PropTypes.string.isRequired,
  //name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProjectApplicantCard;
