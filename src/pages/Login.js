import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'


const Login = () => {
  const { login } = useAuth()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const EmailRef = React.useRef()
  const PasswordRef = React.useRef()
  const navigate = useNavigate()
  const location = useLocation();
  const redirectPath = location.state?.path || '/'; // إذا لم يكن هناك مسار إعادة توجيه، استخدم المسار الجذري


  const handleSubmit = async (e) => {
    e.preventDefault()



    try {
      setError(null)
      setLoading(true)
      await login(EmailRef.current.value, PasswordRef.current.value)
      // يمكنك إعادة التوجيه هنا بعد النجاح إذا أردت
      navigate(redirectPath, { replace: true }) // إعادة التوجيه إلى المسار المحدد أو الجذري

    } catch (error) {
      setError('Failed to log in: ' + error.message)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group id='email' htmlFor='email'>Email</Form.Group>
            <Form.Control type='email' required ref={EmailRef} id='email' />
            <Form.Group id='password' htmlFor='password'>Password</Form.Group>
            <Form.Control type='password' required ref={PasswordRef} id='password' />
            <Button className='w-100' type='submit ' disabled={loading}>Log In</Button>
          </Form>
        </Card.Body>

      </Card>

      <Card.Text className='text-center mt-2'>
        <Link to='/forgot-password'>Forgot Password?</Link>
      </Card.Text>
      <Card.Text className='text-center mt-2'>
        Need an account?<Link to='/signup'>Sign Up</Link>
      </Card.Text>

    </>
  )
}

export default Login
