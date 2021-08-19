import { Form, Button } from 'semantic-ui-react'
import './RegisterForm.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../../gql/user'
import { toast } from 'react-toastify'

const RegisterForm = ({setShowLogin}) => {

    const [ register ] = useMutation(REGISTER)

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            repeatpassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/).required(true),
            email: Yup.string().email().required(true),
            password: Yup.string().required(true).oneOf([Yup.ref('repeatpassword')]),
            repeatpassword: Yup.string().required(true).oneOf([Yup.ref('password')])
        }),
        onSubmit: async (formData) => {
            try {
                const newUser =  formData
                delete newUser.repeatpassword
                
                const result = await register({
                    variables: {
                        input: newUser
                    }
                })
                console.log(result)
                toast.success('Registrado correctamente')
                setShowLogin(true)
            } catch (error) {
                toast.error(error.message)
                console.error(error)
            }
        }
    })

    return (
        <>  
            <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Nombre y Apellidos"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de Usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username && true}
                />
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
                <Form.Input 
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatpassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatpassword}
                    error={formik.errors.repeatpassword && true}
                />
                <Button
                    className="btn-submit"
                >Registrarse</Button>
            </Form>
        </>
    )
}

export default RegisterForm
