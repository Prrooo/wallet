import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
// import { useUser } from "../hooks/useUser";
import axios from "axios";

const Dashboard = () => {
  // const user=useUser();
  // if (user.loading) {
  //   return <h1>Loading...</h1>;
  // }
  const [loading, setLoading] = useState(false);
  const [userBalance,setUserBalance]=useState(0);
  const [firstName,setFirstName]=useState("User");

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://wallet-yulg.vercel.app/api/v1/user/me",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log("fetch response",response.data);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log("error found while fetching data form backend");
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    (async ()=>{
      const response=await fetchData();
      setUserBalance(response.account.balance);
      setFirstName(response.user.firstName);
    })()
  }, []);

  return (
    <div>
      <AppBar />
      <div className="m-8">
        {loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <Balance value={userBalance} />
            <Users userName={firstName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
