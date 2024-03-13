import { useUser } from '../hooks/useUser'
import { Navigate } from 'react-router-dom';

const IndexComp = () => {
    const user=useUser();
    if(user.loading){
        return <h1>Loading.....</h1>
    }
    if(!user.userDetails){
        return <Navigate to={"/signin"} />
    }
    return <Navigate to={"/dashboard"}/>
}

export default IndexComp