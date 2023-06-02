import 'matchmedia-polyfill'
import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from '..'
import '@testing-library/jest-dom'
import RegisterScreen from '../../RegisterScreen'

describe('Login screen page renders correctly', () => {
  test('Login page renders without error', () => {
    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    )
  })

  test('The user is redirect to the register page when Signup is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Signup'))

    expect(getByText('Already a user?')).toBeInTheDocument()
  })
})
