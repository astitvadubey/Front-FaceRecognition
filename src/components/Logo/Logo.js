import React  from "react";
import Tilt from 'react-tilt'
import './Logo.css';
import log from './log.png';

const Logo  =() => {
  return (
    <div className = 'ma4 mt0'>
    <Tilt className="Tilt   br2 shadow-2" options={{ max : 100 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa3"><img alt ="logo" style = {{paddingTop:  '5px'}} src ={log}/>   </div>
</Tilt>
      
    </div>
  )
}
export default Logo;
