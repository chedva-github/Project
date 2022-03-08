import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'

const axios = require("axios");

export default function UploadImg (props) {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
   const [file,setFile] = useState()
     
    
    function onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("http://localhost:4000/uploadImg",formData,config)
            .then((response) => {
             
                dispatch(actions.setImg('http://localhost:4000/'+response.data.path.replace("//","/")))
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
  function  onChange(e) {
       setFile(e.target.files[0]);
    }

        return (
            <form onSubmit={onFormSubmit}>
                <input type="file" name="myImage" onChange= {onChange} />העלאת תמונה לשלט
                <button type="submit">Upload</button>
            </form>
        )
   
}

