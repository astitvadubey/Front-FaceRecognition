import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation'

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Register from './components/Register/Register'
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a0181494dd4841abb6017b0afd475cce'
 });
const para = {
particles: {
 
number:{
  value: 30,
  density:  {
    enable: true, 
    value_area: 800
  }
}

}
}
const initialState ={
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
 isSignedIn: false,
 user:{
  id: '',
  name: '',
  email:"",
 
  entries: 0,
  joined: '',
 }
  
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }
  loaduser =(data) =>{
   this.setState({user:{  
    id: data.id,
   name: data.name,
   email:data.email,
  
   entries: data.entries,
   joined: data.joined,

   }})
  }


calculateFaceLocation=(data)=>{
 const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
 const image = document.getElementById('inputimage')
 const width =Number(image.width)
  const height = Number(image.height)
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol:  width -(clarifaiFace.right_col * width)  ,
    bottomRow: height -(clarifaiFace.bottom_row * height) 
  
  }

}
dispalyfaceBox =(box) => {

  this.setState({box: box})
 

}



  onInputChange = (event)=>{
  this.setState({input: event.target.value});
  }
  onButtonClick = ()=>{
    this.setState({imageUrl: this.state.input});
    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3000/image' ,{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response =>response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{
             entries: count
          })
        )
        })
      }
  
     
    this.dispalyfaceBox(this.calculateFaceLocation(response))})
   .catch(err=> console.log(err))


   
  
  }
  onRouteChange =(route) => {
    if(route === 'SignOut'){
      this.setState(initialState);
    }
    else if(route ==='home'){
      this.setState({isSignedIn: true});

    }
    this.setState({route: route});

  }
  render() {
     const { isSignedIn,imageUrl,route,box} = this.state;
          return (
                    <div className ="App">
                          <Particles  className ="new"  params={para}  
                         
                              
                              />
                           <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />



                        { this.state.route=== 'home'  ? 
                         <div><Logo />
                               <Rank  name={this.state.user.name} 
                               entries={this.state.user.entries}/>
                              <ImageLinkForm  onInputChange={this.onInputChange}  onButtonClick={this.onButtonClick}/>
                              <FaceRecognition box ={box} imageUrl={imageUrl}/>   
                          </div> :  (route === 'SignIn'?
                          <SignIn  loaduser={this.loaduser} onRouteChange ={this.onRouteChange} />
                         : <Register 
                         loaduser={this.loaduser}
                         onRouteChange ={this.onRouteChange} />
                        
                                    ) 
                        }        
                     </div>
                  );
            }}  

export default App;
