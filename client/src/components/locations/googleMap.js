import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import React, {useEffect} from 'react';
 import {useDispatch,useSelector} from 'react-redux'
 import action from '../../redux/action'
 
 function MapGoogle(props) {
   const dispatch = useDispatch()
   const data = useSelector(state => state.AdvertisingPoint)

   useEffect(() => {
    // debugger
    dispatch(action.getAllAdvertisingPoint())
   }, [])

    return (
  <>
      <Map google={props.google} zoom={14}
            style={{ width: '80%', height: '70%', position: 'relative' }}
            initialCenter={{
                lat: 32.089870,
                lng: 34.880451
              }}
          >
            {data?.advertisingPoint?.map((item,key)=>(
               <Marker name={"Current location"}
                position={{lat: item.lat, lng: item.lng}}
                onClick={()=>dispatch(action.setValue({street:item.address,size:item.size}))}
                />
            ))}
         </Map>
   </>
    );
  }
  
  export default GoogleApiWrapper({
    apiKey: "AIzaSyCfdA6M-IOskrE6ifkHSiOfa8BB5nOkzoA"
    ,region: 'EB',
    language: 'EB'
  })(MapGoogle);
  