import PropTypes from "prop-types";
import React, { Component } from "react";
import API from "../../../utils/Api";
import AmazonSearch from "../../AmazonSearch";
import {
  Container,
  Grid,
  Header,
  Input,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import WalmartSearch from "../../WalmartSearch";
import TargetSearch from "../../TargetSearch";
import "./search.css";
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = ({ mobile }) => (
  <Container id="containerID" text>
    <Header
      as="h2"
      id="subtitle"
      content="Make Holiday Shopping Easy"
      style={{
        color: "black",
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
      />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};


<<<<<<< Updated upstream
class DesktopContainer2 extends Component {
  componentWillMount(){ 
    // this.setState({searchValue: this.props.location.state.searchValue})

    this.setState({searchValue: ""})
  }
  
  componentDidMount() {
      API.search(this.state.searchValue).then(result => {
=======
class DesktopContainer extends Component {
  componentWillReceiveProps(){
    if(this.props.location.state.searchValue){
    this.setState({searchValue: this.props.location.state.searchValue})}
    else{
    this.setState({searchValue: ""})}
  }
  
  componentDidMount() {
    if(this.props.location.state.searchValue){
      API.search(this.props.location.state.searchValue).then(result => {
>>>>>>> Stashed changes
        // console.log(result);
        const items = result;
        this.setState({ items }); //, function () {console.log(this.state.items)});
      });
    
    }}
  state = {
    items: [],
    searchValue: ""
  };
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };
  handleSearchChange = e => {
    const value = e.target.value;

    this.setState(
      {
        searchValue: value
      },
      function() {
        console.log(this.state.searchValue);
      }
    );

    if (value === "") {
      this.setState({
        items: []
      });
    }
  };
  fetchItems = event => {
    // console.log("show me that you work")
    if (event.key === "Enter")
      API.search(this.state.searchValue).then(result => {
        // console.log(result);
        const items = result;
        this.setState({ items }); //, function () {console.log(this.state.items)});
      });
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { items } = this.state;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <div id="background">
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
            id="segmentID"
            textAlign="center"
            style={{ minHeight: "100vh", padding: "1em 0em"}}
            vertical
            >
            <HomepageHeading />
            <Container fluid style={{ marginTop: '4.6em', width: '80vw'} }>
            <Input fluid value={this.state.searchValue} onChange={this.handleSearchChange} onKeyPress={this.fetchItems} className="ui input" placeholder="Search..." /> 
            <br></br>
          <Grid divided="vertically" id='grid'>
            <Grid.Row columns="3">
              <Grid.Column>
                <WalmartSearch data={items[0]}/>
              </Grid.Column>
              <Grid.Column>
                <AmazonSearch  data={items[1]} />
              </Grid.Column>
              <Grid.Column>
                <TargetSearch data={items[2]} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
         
          </Segment>
          
        </Visibility>

          {children}
        </div>
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {
    items: [],
    searchValue: ""
  };
  handleSearchChange = e => {
    const value = e.target.value;

    this.setState(
      {
        searchValue: value
      },
      function() {
        console.log(this.state.searchValue);
      }
    );

    if (value === "") {
      this.setState({
        items: []
      });
    }
  };
  fetchItems = event => {
    // console.log("show me that you work")
    if (event.key === "Enter")
      API.search(this.state.searchValue).then(result => {
        // console.log(result);
        const items = result;
        this.setState({ items }); //, function () {console.log(this.state.items)});
      });
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  render() {
    const { children } = this.props;
    const { items } = this.state;
    // console.log("my props ", this.props.location.state.searchValue);
    return (
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyTablet.minWidth}>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: "100vh", padding: "1em 0em" }}
          vertical
        >
          <HomepageHeading mobile />
          <Container fluid style={{ marginTop: "4.6em", width: "80vw" }}>
            <Input
              fluid
              value={
                // this.props.location.state.searchValue
                //   ? this.props.location.state.searchValue
                  this.state.searchValue
              }
              onChange={this.handleSearchChange}
              onKeyPress={this.fetchItems}
              className="ui input"
              placeholder="Search..."
            />
            <br></br>
            <Grid divided="vertically" id="grid">
              <Grid.Row columns="3">
                <Grid.Column>
                  <WalmartSearch data={items[0]} />
                </Grid.Column>
                <Grid.Column>
                  <AmazonSearch data={items[1]} />
                </Grid.Column>
                <Grid.Column>
                  <TargetSearch data={items[2]} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = props => {
  console.log("props search result :", props);
  return (
    <div>
      <DesktopContainer getWidth={getWidth} {...props} />
      <MobileContainer getWidth={getWidth} {...props} />
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default ResponsiveContainer;