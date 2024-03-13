
const Balance = ({value}) => {
  const data=value|| 0;
  // const [search]=useSearchParams();
  // const username=search.get("username");

  // useEffect(()=>{
  //   (async ()=>{
  //     const response=await axios.get("http://localhost:3000/api/v1/account/balance?username="+username);
  //     setValue(response.data.balance);
  //   })()
  // },[])

  return (
    <div className="flex">
        <div className="font-bold text-lg">
            Your Balance
        </div>
        <div className=" font-semibold ml-4 text-lg">
            Rs {data}
        </div>
    </div>
  )
}

export default Balance