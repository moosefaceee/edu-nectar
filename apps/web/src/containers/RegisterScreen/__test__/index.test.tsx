import 'matchmedia-polyfill'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import RegisterScreen from '..'
import LoginScreen from '../../LoginScreen'
import '@testing-library/jest-dom'

describe('Register screen renders correctly', () => {
  test('Register screen renders without error', () => {
    render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    )
  })

  test('The user is redirected to login page when Login is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Login'))

    expect(getByText('Sign in to your account')).toBeInTheDocument()
  })
})
