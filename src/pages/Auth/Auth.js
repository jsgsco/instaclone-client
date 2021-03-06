import { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import instaClone from "../../assets/images/instaclone.png";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from '../../components/Auth/RegisterForm'
import "./Auth.scss";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className="auth">
      <Image src={instaClone} />

      <div className="container-form">
        {
            showLogin ? <LoginForm /> : <RegisterForm setShowLogin={setShowLogin}/>
        }
      </div>

      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
            </>
          ) : (
            <>
              ¡Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>Iniciar Sesion</span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;
