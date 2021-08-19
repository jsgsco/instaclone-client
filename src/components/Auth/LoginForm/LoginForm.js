import { Form, Button } from 'semantic-ui-react'
import './LoginForm.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../gql/user'
import { toast } from 'react-toastify'
import { setToken, decodeToken } from '../../../utils/token'
import useAuth from '../../../hooks/useAuth'

const LoginForm = () => {

    const [ login ] = useMutation(LOGIN)
    const { setUser } = useAuth()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(true),
            password: Yup.string().required(true)
        }),
        onSubmit: async (formData) => {
            try {
                const result = await login({
                    variables: {
                        input: formData
                    }
                })
                
                setToken(result.data.login.token)
                setUser(decodeToken(result.data.login.token))
            } catch (error) {
                toast.error(error.message)
            }
        }
    })
    
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entra para ver fotos y videos de tus amigos.</h2>
            <Form.Input 
                type="text"
                placeholder="Correo Electronico"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email && true}
            />
            <Form.Input 
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password && true}
            />
            <Button 
                type="submit" 
                className="btn-submit"
            >Iniciar Sesion</Button>
        </Form>
    )
}

export default LoginForm
