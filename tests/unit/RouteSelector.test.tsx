import { RouteSelector } from '@/components/RouteSelector'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('RouteSelector', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/home')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the route selector', () => {
    const routes = [
      { name: 'Home', path: '/home' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ]

    render(<RouteSelector routes={routes} />)

    const routeSelector = screen.getByTestId('route-selector')

    expect(routeSelector).toBeInTheDocument()
  })

  it('should render the correct number of route buttons', () => {
    const routes = [
      { name: 'Home', path: '/home' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ]

    render(<RouteSelector routes={routes} />)

    const routeButtons = screen.getAllByRole('button')

    expect(routeButtons).toHaveLength(routes.length)
  })

  it('should highlight the current route button', () => {
    const routes = [
      { name: 'Home', path: '/home' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ]

    render(<RouteSelector routes={routes} />)

    const currentRouteButton = screen.getByText('Home')

    expect(currentRouteButton).toHaveAttribute('aria-current', 'true')
  })
})
