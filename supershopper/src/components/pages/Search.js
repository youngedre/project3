import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {Container,  Header, Input, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import './search.css'
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container id='containerID' text>
    <Header
      as='h1'
      id="title"
      content='Super Holiday Shopper!'
      style={{
        color: 'white' ,
        fontSize: mobile ? '4em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      id= 'subtitle'
      content='Make Holiday Shopping Easy'
      style={{
        color: 'black',
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Container id='searchcontainer'>
  </Container>
  </Container>
)


HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {
    searchValue: ""
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    }, function(){console.log(this.state.searchValue)});
    
  };

  handleSearch = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    }, function(){ if(e.key === 'Enter') {
      console.log(this.state.searchValue)
  }});

  // if(e.key === 'Enter'){
  //   this.props.history.push({
  //     pathname: '/template',
  //     search: '?query=abc',
  //     state: { detail: response.data }
  //   })
  //   browserHistory.push({pathname: '/search', state: {searchValue: value}});

  // }
}

  render() {
    const { children } = this.props
    console.log('props ', this.props)
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            id="segmentID"
            textAlign='center'
            style={{ minHeight: '100vh', padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading />
            <Container fluid style={{ width: '80vw'}}>
            <Input fluid value={this.state.searchValue} onChange={this.handleSearchChange} onKeyPress={this.handleSearch} className="ui input" placeholder="Search..." /> 
            </Container >
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
        <Responsive getWidth={getWidth} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            id="segmentID"
            inverted
            textAlign='center'
            style={{ minHeight: '100vh', padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading mobile />
            <Input fluid value={this.state.searchValue} onChange={this.handleSearchChange} onKeyPress={this.fetchItems} className="ui input" placeholder="Search..." /> 
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => {
  console.log('children ', children)
  return (
    <div>
      <DesktopContainer getWidth={getWidth}>{children}</DesktopContainer>
      <MobileContainer getWidth={getWidth}>{children}</MobileContainer>
    </div>
  )
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


export default ResponsiveContainer