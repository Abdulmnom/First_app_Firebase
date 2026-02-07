import { render, screen } from '@testing-library/react';
import App from './App';

import { AuthProvider } from './context/AuthContext';

test('renders login page', async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const heading = await screen.findByRole('heading', { name: /log in/i });
  expect(heading).toBeInTheDocument();
});
