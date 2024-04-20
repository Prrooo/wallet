import axios from "axios";
import { useEffect, useState } from "react";

export const useUser=async ()=>{
    const [userDetails,setUserDetails]=useState({});
    const [loading,setLoading]=useState(false);

    console.log("get call");
    
    async function getDetails(){
        setLoading(true);
        try {
            const response=await axios.get(
                "https://wallet-yulg.vercel.app/api/v1/user/me",
                {
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }   
                }
            );
            setUserDetails(response.data.account);
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.log("error found while fetching data form backend");
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getDetails();
    },[]);

    return {
        userDetails,
        loading
    }
}
