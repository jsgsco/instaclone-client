import { Fragment } from "react"
import { useParams } from "react-router-dom"
import Profile from "../components/Profile/Profile"

const User = () => {

    const { username } = useParams()
    
    return (
        <Fragment>
            <Profile 
                username={username}
            />
        </Fragment>
    )
}

export default User
