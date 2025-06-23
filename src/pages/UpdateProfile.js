import React from 'react'
import { Card , Alert , Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UpdateProfile = () => {
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const EmailRef = React.useRef()
    const PasswordRef = React.useRef()
    const PasswordConfirmRef = React.useRef()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const promises = []
        setError(null)
        setLoading(true)

        if (EmailRef.current.value !== currentUser.email) {
            // push the updateEmail promise only if the email has changed
            promises.push(updateEmail(EmailRef.current.value))
        }

        if (PasswordRef.current.value) {
            // push the updatePassword promise only if the password has changed
            promises.push(updatePassword(PasswordRef.current.value))
        }
        if (PasswordRef.current.value !== PasswordConfirmRef.current.value) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }
      

        try {
            // Promise .all will wait for all promises to resolve
            await Promise.all(promises)
            console.log("Profile updated successfully")
            navigate('/')
        } catch (error) {
            setError('Failed to update profile: ' + error.message)
            console.error("Error updating profile:", error)
        }  finally {
            setLoading(false) // set loading to false after the try/catch block is complete, even if an error occurs.
        }    // finally block will always be executed, regardless of whether an error occurs or not. This is useful for clean-up operations.
    }
  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email' htmlFor='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required ref={EmailRef} defaultValue={ currentUser?.email} />
                </Form.Group>
                <Form.Group id='password' htmlFor='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={PasswordRef} />
                </Form.Group>
                <Form.Group id='password-confirm' htmlFor='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type='password' ref={PasswordConfirmRef} />
                </Form.Group>
                <Button className='w-100' type='submit' disabled={loading}>Update</Button>
            </Form>
        </Card.Body>

    </Card>
    <Card.Text className='text-center mt-2'>
        <Link to='/dashboard'>Cancel</Link>
    </Card.Text>
    </>
  
  )
}

export default UpdateProfile
