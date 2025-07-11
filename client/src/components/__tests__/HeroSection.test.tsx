import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders the hero section', () => {
    render(<HeroSection />)
    
    // Check if the component renders without crashing
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
  
  it('has accessible content', () => {
    render(<HeroSection />)
    
    // Check for heading elements
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
}) 