import React from 'react'
import  './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange , onButtonClick}) => {
  return (
     <div>
     
         <p className ='f3'>{'this brain will detect faces give it a try'}</p>
    
     <div className='center'>
     <div className ='form center pa4 br3 shadow-5'>
         <input className= ' f4 pa2 w-70  center' type ='text' onChange={onInputChange}/>

         <button
          className='w-30 grow f8 link ph8  pv8 dib white bg-light-purple'
          onClick ={onButtonClick}
          >Detect</button>
     </div>
    </div>
    </div>
    
  );
}

export default ImageLinkForm;