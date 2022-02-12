import React, { useEffect, useState } from "react";
import  MyMapComponent  from './googleMap'
import './locations.css'
import action from '../../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Location(props) {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const [arrSize,setArrSize]= useState()
    const [size,setSize]= useState()
    const [arrStreet,setArrStreet]= useState()
    const [street,setStreet]= useState()
    const [date,setDate]= useState()
    const navigate = useNavigate()

    useEffect(async() => {
        debugger
       await dispatch(action.getAllStreets())
       await dispatch(action.getAllSize())
    }, [])

    //props?.location?.state?.street

    useEffect(()=>{
        setArrSize(data?.size?.size)
    },[data?.size?.size])

    useEffect(()=>{
        setArrStreet(data?.streets?.streets)
    },[data?.streets?.streets])


    function sortStreet(size){
        debugger
       let arr = arrStreet.filter(x=>data?.AdvertisingPoint?.advertisingPoint.find(i=>i.address == x._id && i.size == arrSize.find(x=>x.sizeName == size)?._id)!=undefined)
       setArrStreet(arr)
       setSize(size)
    }
    function sortSize(street){
          debugger
          let arr = arrSize.filter(x=>data?.AdvertisingPoint?.advertisingPoint.find(i=> i.size == x._id && i.address == arrStreet.find(x=>x.streetName == street)?._id)!=undefined)
          setArrSize(arr)
          setStreet(street)
    }

    return (
        <div>
            <MyMapComponent></MyMapComponent>

            <div className="topcorner">
                <div>Location</div>

                <div>
                    <input type="date" min="2021-12-21" max="3000-01-01" 
                    onChange={(e)=>setDate(e.target.value)}
                    />
                    {/* <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" type="date" placeholder="תאריך" />
                    <datalist id="ice-cream-flavors">
                        <option value="Chocolate" />
                        <option value="Coconut" />
                        <option value="Mint" />
                        <option value="Strawberry" />
                        <option value="Vanilla" />
                    </datalist> */}
                </div>
                <br />
                <div>
                    <input list="ice-cream-flavors" id="ice-cream-choice" onChange={(e)=>sortSize(e.target.value)} defaultValue={data?.streets?.streets?.find(x=>x._id == data?.AdvertisingPoint?.street)?.streetName} name="ice-cream-choice" placeholder="בחר רחוב" />
                    <datalist id="ice-cream-flavors">
                        {
                            arrStreet?.map((item, key) => {
                            // data?.streets?.streets?.map((item, key) => {
                                return <option key={key} value={item.streetName}></option>
                            }
                            )}
                    </datalist>
                </div>
                <br />
                <div>
                    <input list="ice" id="ice-cream" onChange={(e)=>sortStreet(e.target.value)}
                     defaultValue={data?.size?.size?.find(x=>x._id == data?.AdvertisingPoint?.size)?.sizeName} name="ice-cream" placeholder="בחר גודל" />
                    <datalist id="ice">
                        {
                            arrSize?.map((item, key) => {
                            // data?.size?.size?.map((item, key) => {
                                return <option key={key} value={item.sizeName}></option>
                            }
                            )
                            }
                    </datalist>
                </div>
              <button disabled={!street||!date||!size} onClick={()=>navigate({pathname:'/orderPage',state:{street:street,size:size,date:date}})}></button>
            </div>
        </div>

    )
}



