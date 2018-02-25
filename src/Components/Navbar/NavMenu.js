import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import NavEntries from './NavMenuData';

const NavList = styled.ul`
  * {
    list-style: none;
  }
  >li {
    display: inline-block;
    color: ${props => props.position === 1 ? props.theme.contrastText : props.theme.primaryText};
    margin-right: 2px;
    transition: all .2s linear;
    a {
      display: inline-block;
      padding: 8px 20px;
      border-radius: 3px;
      &:hover, &.active {
        background: ${props => rgba(props.theme.blueLt,.3) };
        transition: all .2s linear;
      }
    }
    ${'' /* show top-level menu icons only on mobile */}
    [class^='icon-'] { 
      display: ${props => props.isMobile ? 'inline-block' : 'none'};
      color: ${props => props.theme.primaryText} !important;
    }
  }
  @media (max-width: 1023px) {
    margin-top: 50px;
    li {
      display: block;
      * {
        font-size: 1em;
        line-height: 2em;
      }
    }
  }
`
const Icon = styled.span`
  position: relative;
  left: -8px;
  font-size: 20px !important;
`

const NavItems = ({menuItems, ...props}) => {
  return menuItems.map(m => (
      <li key={m.label} 
          onMouseEnter={(m.label === 'Services' ? props.openServicesMenu : props.closeServicesMenu)}
          onClick={props.handleClick}>
        <NavLink to={m.path} exact={(m.path === '/' ? true : false)}>
          <Icon className={`icon-${m.icon}`}/>
            {m.label}
        </NavLink>
        {
          (m.children ? 
            props.isMobile ?
            <ul style={{marginLeft:'24px'}}>
              <NavItems {...props} menuItems={m.children} />
            </ul> 
            : <Submenu {...props}/>  
          : '')
        }
      </li>
    ))
}

const Submenu = (props) => {
  return (
    <Popover open={props.servicesOpen}
                 anchorEl={props.anchorEl}
                 anchorOrigin={props.anchorOrigin}
                 targetOrigin={props.targetOrigin}
                 useLayerForClickAway={false}
                 onRequestClose={props.closeServicesMenu}>
          <Menu onMouseLeave={props.closeServicesMenu}
                desktop={true}
                onClick={props.handleClick}>
            <NavLink to="/services">
              <MenuItem onClick={props.closeServicesMenu} 
                        value={0}
                        primaryText="Services"
                        leftIcon={<Icon className="icon-accessibility"/>}/>
            </NavLink>
            {NavEntries[1]['children'].map((m,i) => {
              return (
                <NavLink key={i} to={m.path}>
                  <MenuItem 
                    onClick={props.closeServicesMenu}
                    value={i+1}
                    primaryText={m.label}
                    leftIcon={<i className={`icon-${m.icon}`} ></i>}
                  />
                </NavLink>
              )
            })}
          </Menu>
        </Popover>
  )
}


class NavMenu extends React.Component {
  state = {
    servicesOpen: false,
    anchorEl: null
  }
  openServicesMenu = event => {
    event.preventDefault();
    this.setState({ servicesOpen: true, anchorEl: event.currentTarget});
  }
  closeServicesMenu = event => {
    if (this.props.isDrawerOpen) return;
    else this.setState({ servicesOpen:  false });
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.props.isDrawerOpen && nextProps.isDrawerOpen) {
      this.setState({servicesOpen: true, anchorEl: this.refs.submenuAnchor});
    } else if (!this.props.isDrawerOpen || !nextProps.isDrawerOpen) {
      this.setState({servicesOpen: false});
    }
  }

  
  render () {
    return (
      <nav className="navbar">
        <NavList position={this.props.position}
                  isMobile={this.props.isMobile}>
          <NavItems {...this.props} 
                    {...this.state}
                    menuItems={NavEntries}
                    openServicesMenu={this.openServicesMenu}
                    closeServicesMenu={this.closeServicesMenu}  />
        </NavList>
      </nav>
    )
  }
}

NavMenu.propTypes = {
  isMobile: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  position: PropTypes.number.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
  targetOrigin: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
}

export default NavMenu;
