import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Button,Col,Thumbnail,Panel } from 'react-bootstrap';

import DetailView from './DetailView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isPaneOpen: false,
        isPaneOpenLeft: false,
        isMapOpen:false,
        selectedRestaurant:{}
    };
    this.changePaneState = this.changePaneState.bind(this);
    this.closePane=this.closePane.bind(this);
    this.showLocation=this.showLocation.bind(this)
}

componentDidMount() {
  Modal.setAppElement(this.el);
}

changePaneState(restaurant){
  console.log(restaurant)
  this.setState({isPaneOpen:true,selectedRestaurant:restaurant})
}
closePane(){
  this.setState({isPaneOpen:false})
}
showLocation(restaurant){
  this.setState({isMapOpen:!this.state.isMapOpen})
  this.setState({isPaneOpen:false})
}

  render() {
    return (
      <div ref={ref => this.el = ref}>
            <DetailView 
            openPane={this.changePaneState} 
            closePane={this.closePane} 
            map={this.state.isMapOpen} 
            changeMap={this.showLocation}
            selectedRestaurant={this.state.selectedRestaurant}/>
            <SlidingPane
                isOpen={ this.state.isPaneOpen }
                onRequestClose={ () => {this.setState({ isPaneOpen: false })} }
                >
                <div>
                <Col xs={12} md={6}>
                  <Panel>
                      <Panel.Body>
                          <h3>{this.state.selectedRestaurant.name}</h3>
                          <h5>{this.state.selectedRestaurant.category}</h5>
                        <Thumbnail  src={this.state.selectedRestaurant.backgroundImageURL} alt="242x200">
                          <p>
                            <Button bsStyle="primary" onClick={this.showDetails}>Order</Button>
                            &nbsp;
                            <Button bsStyle="default" onClick={(e)=>{this.showLocation(this.state.selectedRestaurant)}}>Location</Button>
                            &nbsp;
                            <Button bsStyle="default" onClick={this.closePane}>Go To Restaurants</Button>
                        
                          </p>
                        </Thumbnail>
                      </Panel.Body>
                    </Panel>
                  </Col>
                </div>
                <br />
            </SlidingPane>
           
        </div>
    );
  }
}

export default App;
