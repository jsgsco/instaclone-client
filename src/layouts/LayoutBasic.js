import { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import Header from '../components/Header/Header';

const LayoutBasic = ({children}) => {
    return ( 
        <Fragment>
            <Header />
            <Container className="layout-basic">
                {children}
            </Container>
        </Fragment>
     );
}
 
export default LayoutBasic;