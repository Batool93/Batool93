import { Auth } from 'aws-amplify';
import config from '../config'
//const FEATURE_URL = process.env.REACT_APP_FEATURE_URL;
//const FEATURE_ID = process.env.REACT_APP_FEATURE_ID;
//const PROJECT_URL = process.env.REACT_APP_FEATURE_URL;
//const EXECUTION_URL=process.env.REACT_APP_REXECUTION_URL;
//const now = new Date();
//console.log("jhi",EXECUTION_URL)

class FeaturesApi {
 

  async getFeaturesMenu(projectId) {
      const token = await Auth.currentSession().then(
        data => data.getIdToken().getJwtToken()
      
      )
    return fetch( config.PROJECT_ID_URL+projectId+'/features', 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
      console.log("/features res response...")
      console.log(data); 
      let menuitems_features = []
      for (const f of data.Items){
        let menuitems_scenarios = []
        for (const s of f.scenarios){
          menuitems_scenarios.push({
            title: s.name,
            path: '/features/project/' + f.projectId + '/feature/' + f.id,
            scenarioId: s.id,
            featureId: f.id
          })
        }
        menuitems_features.push({
          title: f.featureName,
          path: '/features/project/' + f.projectId + '/feature/' + f.id,
          children :menuitems_scenarios 
        })
      }
      const res = [
          {
            title: 'Features',
            items: menuitems_features
          }
        ]
      return res
    
    } )
    .catch((error) => { console.warn(error); })
    //.then(data => this.setState({ features: data }));

  

  }

  async saveFeature(newFeature) {
    const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.FEATURE_SAVE, 
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
       
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(newFeature) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(responseJSON => {
      console.log('saveFeature:' + responseJSON);
      return responseJSON;
    })

  }

  async deleteFeature(featureId){
    const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      
      ) 
      console.log("token",token)
    return(
    fetch(config.DELETE_FEATURE+featureId, 
    {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(featureId)
      })
      .catch(err => {
        console.log(err)
      })
      )}

  async getFeature(featureId) {
   const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.FEATURE_ID_URL+featureId, 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
      console.log('getFeature:')
      console.log(data.Item)
      return data.Item
    });

  }

async getFeatures() {
   const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.FEATURES_URL, 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
      console.log('getFeature:')
      console.log(data.Item)
      return data.Item
    });

  }
  


   async getExecution() {
   const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.EXECUTION_URL, 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
  
      console.log(data.Items)
      return data.Items
    });

  }

   async getScenarioExecution() {
   const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      )
    return fetch( config.SCENARIO_EXECUTION_URL, 
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
  
      console.log(data.Items)
      return data.Items
    });

  }



  async runScenario(featureId, scenatioId) {
   // const token = await Auth.currentSession().then(
      // data => data.getIdToken().getJwtToken()
       //)
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });

    
    var call = {
      featureId: featureId,
      scenarioId: scenatioId,
      userId: user.username
    }
    console.log('calllinig SIP trunk .................')
     
    return fetch( config.SCENARIO_RUN_URL, 
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(call) // body data type must match "Content-Type" header
    })
    .then(response => {
      console.log('runScenario:' + response);
      return response;
      
    }
    )
    

  }

  async runFeature(featureId,scenatioId) {
   const user = await Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
   /* const token = await Auth.currentSession().then(
      data => data.getIdToken().getJwtToken()
      ) */
    var call = {
      featureId: featureId,
      userId: user.username,
      //scenarioId: scenatioId,
    }
    console.log('calllinig SIP trunk for feature.................')
     
    return fetch( config.FEATURE_RUN_URL, 
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(call) // body data type must match "Content-Type" header
    })
    .then(response => {
      console.log('runFeature:' + response);
      return response;
      
    }
    )
    

  }


}


export const featuresApi = new FeaturesApi();