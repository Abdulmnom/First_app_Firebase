import React from 'react'
import { Card , Container, Alert  } from 'react-bootstrap'
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const {currentUser , logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        setError(null)
        setLoading(true)
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            setError('Failed to log out: ' + error.message)
           
        }
        }
  return (
  <>
  <Container>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Dashboard</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <p className='text-center'>Welcome to your dashboard!</p>
            <strong className='text-center'>User Email: {currentUser &&currentUser.email}</strong>
            <Card.Text className='text-center mt-2'>
                <Link to='/update-profile' className='text-center btn btn-primary w-100 mt-2'>Update Profile</Link>
            </Card.Text>
           
        </Card.Body>
    </Card>
    <Card.Text className='text-center mt-2'>
        <Link to='/login' className='btn btn-secondary w-100 ' onClick={handleLogout} disabled={loading}>Log Out</Link>
    </Card.Text>
  </Container>
    
  </>
  )
}

export default Dashboard

