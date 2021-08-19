import './AvatarForm.scss'
import { Button } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AVATAR } from '../../../gql/user'

const AvatarForm = ({setShowModal}) => {

    const [ updateAvatar ] = useMutation(UPDATE_AVATAR)

    const onDrop = useCallback(
        async (acceptedFile) => {
            const file = acceptedFile[0]

           console.log(file)

        },
        [],
    )

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    return ( 
        <div className="avatar-form">
            <Button {...getRootProps()}>Cargar una foto</Button>
            <Button>Elminar foto actual</Button>
            <Button
                onClick={ () => setShowModal(false) }
            >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
     );
}
 
export default AvatarForm;