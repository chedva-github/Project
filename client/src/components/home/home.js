import React from 'react'
import backround from '../../asserts/img/1.png'
import './home.css'
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

var images = [
    "http://megamedia.co.il/wp-content/uploads/2018/01/Untitled_Panorama2.jpg",
    "http://megamedia.co.il/wp-content/uploads/2018/01/182.jpg",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmizbala.com%2Foffline%2Fbillboards%2F85958&psig=AOvVaw1OfVdw6guQfat7nfMnX-Vi&ust=1647067219556000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNj9r9m5vfYCFQAAAAAdAAAAABAJ"
]

export default function Home() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <div className='container-home'>
                {/* // style={{ backgroundImage: 'url(1.png)'}}> */}
                {/* <div className='img-back'>
                    <img src={images[0]} />
                </div> */}
                <div className='detailes'>
                    <h2 >תוכן, טכנולוגיה וחדשנות</h2><br />
                    <h2>יוצאים מגבולות המסך</h2><br />
                    <Button className='enter-btn' onClick={() => navigate('/Login')}>צור קשר</Button>
                </div>
                {/* <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* <Box sx={style}> */}
                {/* <Box className='box'>

                    </Box>
                </Modal> */}
            </div>
        </>
    )
}