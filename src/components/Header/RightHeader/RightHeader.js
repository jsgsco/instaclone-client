import { Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import avatar from '../../../assets/images/avatar.png'
import useAuth from '../../../hooks/useAuth'
import './RightHeader.scss'

const RightHeader = () => {

    const { auth } = useAuth()

    return ( 
        <div className="right-header">
            <Link to="/">
                <Icon name="home" />
            </Link>
            <Icon name="plus" />
            <Link to={`/${auth.username}`}>
                <Image 
                    src={avatar}
                    avatar
                />
            </Link>
        </div>
     );
}
 
export default RightHeader;