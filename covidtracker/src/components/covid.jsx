import React from 'react'
import { useEffect } from 'react'



 const Covid = () => {
    const getCovidData = async () => {
        try{
            const res = await fetch('https://api.covid19pakistan.org/data.json')
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getCovidData();
    }, [])


    return (
        <div>
 i dont wanna say any thing
        </div>
    )
}
export default Covid
