import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'

function QueryNavLink({ to, ...props }: { to: string } & NavLinkProps): JSX.Element {
  let location = useLocation()

  return <NavLink to={to + location.search} {...props} />
}

export default QueryNavLink
