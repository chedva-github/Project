import React from 'react'
import backround from '../../asserts/img/1.png'
import './home.css'
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useNavigate} from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Home() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <div className='container'
            style={{ backgroundImage: 'url(1.png)'}}>
       
            <Button size='large' variant="contained" color="secondary" onClick={()=>navigate('/Login')}>כניסה</Button>
            <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                </Box>
            </Modal>
        </div>
        </>
    )
}