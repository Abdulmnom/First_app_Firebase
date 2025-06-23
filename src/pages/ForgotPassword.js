import React from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const ForgotPassword = () => {
    const { resetPassword } = useAuth()
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const EmailRef = React.useRef()
    const navigate = useNavigate()
    const location = useLocation();
    const redirectPath = location.state?.path || '/'; // إذا لم يكن هناك مسار إعادة توجيه، استخدم المسار الجذري
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError(null)
            setLoading(true)
            await resetPassword(EmailRef.current.value)
            // يمكنك إعادة التوجيه هنا بعد النجاح إذا أردت
            console.log("Password reset email sent successfully")
            setMessage('Password reset email sent successfully check your email') // تعيين رسالة نجاح إذا تم إرسال البريد الإلكتروني بنجاح
            navigate(redirectPath, { replace: true }) // إعادة التوجيه إلى المسار المحدد أو الجذري

        } catch (error) {
            setError('Failed to send password reset email: ' + error.message)
            
        }
        setLoading(false)
    }
  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Reset Password</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form.Group id='email' htmlFor='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required ref={EmailRef} />
                </Form.Group>
                <Button className='w-100' type='submit' disabled={loading}>Reset Password</Button>
            </Form>
        </Card.Body>

    </Card>
    <Card.Text className='text-center mt-2'>
        <Link to='/login'>Log In</Link>
    </Card.Text>
    </>
  )
}

export default ForgotPassword

