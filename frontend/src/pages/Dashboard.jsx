import { Navigate } from "react-router-dom"
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { useUser } from "../hooks/useUser"

const Dashboard = () => {
  const user=useUser();
  if(user.loading){
    return <h1>Loading...</h1>
  }
  
  if(!user.userDetails){
    return <Navigate to={"/signin"} />
  }

  return (
    <div>
        <AppBar />
        <div className="m-8">
            <Balance value={user.userDetails.balance} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard