import './Profile.scss'
import { Grid, Image } from 'semantic-ui-react'
import avatar from '../../assets/images/avatar.png'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../gql/user'
import { Fragment, useState } from 'react'
import UserNotFound from '../UserNotFound/UserNotFound'
import ModalBasic from '../Modal/ModalBasic/ModalBasic'
import AvatarForm from '../User/AvatarForm/AvatarForm'
import useAuth from '../../hooks/useAuth'

const Profile = ({username}) => {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [childrenModal, setChildrenModal] = useState(null)
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            username: username
        }
    })

    const { auth } = useAuth()


    if(loading) return null
    if(error) return <UserNotFound />
    const { getUser } = data

    const handleModal = (type) => {
        switch (type) {
            case 'avatar':
                setTitleModal('Cambiar foto de perfil')
                setChildrenModal(
                    <AvatarForm setShowModal={setShowModal}/>
                )
                setShowModal(true)
                break
            default:
                break
        }
    }

    return ( 
        <Fragment>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image 
                        src={avatar}
                        avatar
                        onClick={ () => username === auth.username && handleModal('avatar') }
                    />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>Header Profile</div>
                    <div>Followers</div>
                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {
                            getUser.siteWeb && (
                                <a href={getUser.siteWeb} className="siteWeb" target="_blank" rel="noreferrer">{getUser.siteWeb}</a>
                            )
                        }
                        {
                            getUser.description && (
                                <p className="description">{getUser.description}</p>
                            )
                        }
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </Fragment>
     );
}
 
export default Profile;