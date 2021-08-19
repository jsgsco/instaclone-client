import './Header.scss'
import { Container, Grid, Image } from 'semantic-ui-react'
import logo from '../../assets/images/instaclone.png'
import { Link } from 'react-router-dom'
import RightHeader from './RightHeader/RightHeader'

const Header = () => {
    return ( 
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                            <Image 
                                src={logo}
                                alt="InstaClone"
                            />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        Buscador...
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
     );
}
 
export default Header;