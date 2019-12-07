import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ItemSearch from '../ItemSearch';
import API from "../../utils/Api";
import AmazonSearch from '../AmazonSearch'
import { Button, Container, Card, Divider, Grid, Header, Input, Icon, ImageBackground, List, Menu, Table, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import './search.css'
import GlobalHeader from '../Header/Header'
import WalmartSearch from '../WalmartSearch';
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container id='containerID' text>
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
    items: [],
    searchValue: ""
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    }, function(){console.log(this.state.searchValue)});

    if (value === "") {
      this.setState({
        items: []
      });
    } 
  }
  fetchItems = (event) => {
    // console.log("show me that you work")
    if(event.key === 'Enter')
    API.search(this.state.searchValue, result => {
      const items = result
      this.setState({ items }, function () {console.log(this.state.items)});
    });
  }


  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed, items } = this.state
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <div id= 'background'>
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
            <GlobalHeader/>
            <HomepageHeading />
            <Container fluid style={{ marginTop: '4.6em', width: '80vw'} }>
            <Input fluid value={this.state.searchValue} onChange={this.handleSearchChange} onKeyPress={this.fetchItems} className="ui input" placeholder="Search..." /> 
            <br></br>
          <Grid divided="vertically">
            <Grid.Row columns="2">
              <Grid.Column>
                <WalmartSearch />
              </Grid.Column>
              <Grid.Column>
                <AmazonSearch />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
         
          </Segment>
          
        </Visibility>

        {children}
      </div>
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
        <Responsive>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: '100vh', padding: '1em 0em' }}
            vertical
          >
            <GlobalHeader />
            <HomepageHeading mobile />
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

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


export default ResponsiveContainer