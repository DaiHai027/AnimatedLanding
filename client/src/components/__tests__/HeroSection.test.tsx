import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders the hero section', () => {
    render(<HeroSection />)
    
    // Check if the component renders without crashing
    const heading = screen.getByRole('heading', { name: /Connect Beyond Boundaries/i })
    expect(heading).toBeDefined()
  })
  
  it('has accessible content', () => {
    render(<HeroSection />)
    
    // Check for heading elements
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
}) 