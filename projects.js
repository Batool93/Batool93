import UsersIcon from '../icons/Users';
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import { Auth } from 'aws-amplify';
import config from '../config'
const now = new Date();

class ProjectsApi {
 

  async getProjects() {
    const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )

    return fetch( config.PROJET,
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => { 
      
      // TODO find below fields....
      for (let p of data.Items) {
        p.author = {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Jie Yan Song'
        }
        p.rating= 5
        p.membersCount=2
      }

      return data.Items;
    } )
    .catch((error) => { console.warn(error); })
    //.then(data => this.setState({ features: data }));
  }

  async saveProject(data) {
     const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.SAVEPROJECT, 
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => {console.log(response)})

  }

  async getProject(projectId) {
    const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )

    return fetch( config.GETPROJECT + projectId, 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
         'Authorization': token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => { 
      // TODO fix these fields...
      data.Item.author = {
        id: '5e887b7602bdbc4dbb234b27',
        avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
        name: 'Jie Yan Song'
      }
      data.Item.rating= 5
      data.Item.membersCount=2
      data.Item.members = [
        {
          id: '5e887a62195cc5aef7e8ca5d',
          avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
          job: 'Front End Developer',
          name: 'Marcus Finn'
        },
        {
          id: '5e887ac47eed253091be10cb',
          avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
          job: 'UX Designer',
          name: 'Carson Darrin'
        },
        {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          job: 'Copyright',
          name: 'Jie Yan Song'
        }
      ]
      data.Item.activities = [
        {
          id: '5e8dd0828d628e6f40abdfe8',
          createdAt: subMinutes(now, 23).getTime(),
          description: 'has uploaded a new file',
          subject: 'Project author',
          type: 'upload_file'
        },
        {
          id: '5e8dd0893a6725f2bb603617',
          createdAt: subHours(now, 2).getTime(),
          description: 'joined team as a Front-End Developer',
          subject: 'Adrian Stefan',
          type: 'join_team'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          createdAt: subHours(now, 9).getTime(),
          description: 'joined team as a Full Stack Developer',
          subject: 'Alexndru Robert',
          type: 'join_team'
        },
        {
          id: '5e8dd0960f3f0fe04e64d8f4',
          createdAt: subDays(now, 2).getTime(),
          description: 'raised the project budget',
          subject: 'Project author',
          type: 'price_change'
        },
        {
          id: '5e8dd09db94421c502c53d13',
          createdAt: subDays(now, 4).getTime(),
          description: 'created',
          subject: 'Contest',
          type: 'contest_created'
        }
      ]
      data.Item.applicants = [
        {
          id: '5e887a62195cc5aef7e8ca5d',
          avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
          commonConnections: 12,
          cover: '/static/mock-images/covers/cover_2.jpg',
          name: 'Marcus Finn',
          skills: [
            'User Experience',
            'FrontEnd development',
            'HTML5',
            'VueJS',
            'ReactJS'
          ]
        },
        {
          id: '5e887ac47eed253091be10cb',
          avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
          commonConnections: 5,
          cover: '/static/mock-images/covers/cover_3.jpg',
          name: 'Carson Darrin',
          skills: [
            'User Interface',
            'FullStack development',
            'Angular',
            'ExpressJS'
          ]
        },
        {
          id: '5e86809283e28b96d2d38537',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          commonConnections: 17,
          cover: '/static/mock-images/covers/cover_1.jpg',
          name: 'Jane Rotanson',
          skills: [
            'BackEnd development',
            'Firebase',
            'MongoDB',
            'ExpressJS'
          ]
        }
      ]
      return data.Item;
    } )
    .catch((error) => { console.warn(error); })
    //.then(data => this.setState({ features: data }));

  };
     async updateProject(project) {
      const token = await Auth.currentSession().then(
        data => data.getIdToken().getJwtToken()
        )
      return await fetch(config.UPDATE_PROJECT+project.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  token
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(project)
      })
      .catch(err => {
        console.log(err)
      })
    };
     async deleteProject(project){
      const token = await Auth.currentSession().then(
        data => data.getIdToken().getJwtToken()
        
        ) 
        console.log("token",token)
      return(
      fetch(config.DELETE_PROJECT+project.id, 
      {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(project)
        })
        .catch(err => {
          console.log(err)
        })
        )}
}


export const projectsApi = new ProjectsApi();