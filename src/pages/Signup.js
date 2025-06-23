import React from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { signup } = useAuth()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const EmailRef = React.useRef()
  const PasswordRef = React.useRef()
  const PasswordConfirmRef = React.useRef()
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (PasswordRef.current.value !== PasswordConfirmRef.current.value) {
      setError('Passwords do not match')
      return
    }

    try {
      setError(null)
      setLoading(true)
      await signup(EmailRef.current.value, PasswordRef.current.value)
      // يمكنك إعادة التوجيه هنا بعد النجاح إذا أردت
      console.log("User signed up successfully")
        navigate('/')

    } catch (error) {
      setError('Failed to create an account: ' + error.message)
      console.error("Error signing up:", error)
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control type='email' required ref={EmailRef} id='email' />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control type='password' required ref={PasswordRef} id='password' />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label htmlFor='password-confirm'>Password Confirmation</Form.Label>
              <Form.Control type='password' required ref={PasswordConfirmRef} id='password-confirm' />
            </Form.Group>
            <Button className='w-100' type='submit' disabled={loading}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

export default Signup
