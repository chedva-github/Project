import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'
import './locations.css'

const axios = require("axios");

export default function UploadImg(props) {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const [file, setFile] = useState()


    function onFormSubmit(e) {
        const formData = new FormData();
        formData.append('myImage', e);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("http://localhost:4000/uploadImg", formData, config)
            .then((response) => {

                dispatch(actions.setImg('http://localhost:4000/' + response.data.path.replace("//", "/")))
                alert("הקובץ נקלט בהצלחה");
            }).catch((error) => {
            });
    }
    function onChange(e) {
        setFile(e.target.files[0]);
        onFormSubmit(e.target.files[0])

    }

    return (
            <div className="btn-save">
                <input type="file" name="myImage" onChange={onChange} />  העלאת תמונה לשלט
            </div>
    )

}

