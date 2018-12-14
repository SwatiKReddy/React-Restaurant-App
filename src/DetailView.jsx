import React, { Component } from 'react';
import { Button,Grid,Row,Col,Thumbnail,Panel } from 'react-bootstrap';

import { Map, GoogleApiWrapper,Marker ,InfoWindow} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class DetailView extends Component {
  
    constructor(props) {
      console.log(props)
        super(props);
         this.state = {
          error: null,
          isLoaded: false,
          items: [],
          showingInfoWindow: false,
          activeMarker: {},

        };
        this.showDetails=this.showDetails.bind(this);
        this.backToDetails=this.backToDetails.bind(this)

      }
      showDetails(restaurant){
        this.props.openPane(restaurant)
      }
      closePane(){
        this.props.closePane()
      }
      backToDetails(){
        this.props.changeMap()
        console.log()
      }
      onMarkerClick = (props, marker, e) =>{
        console.log(props, marker, e)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
         
      componentDidMount() {
        fetch("https://s3.amazonaws.com/br-codingexams/restaurants.json")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.restaurants
              });
            },
         
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              {this.props.map && <div id="map">
              <div id="backBtn">
              <Button bsStyle="info" onClick={this.backToDetails}>Restaurant Details</Button>
              </div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                    lat: this.props.selectedRestaurant.location.lat,
                    lng: this.props.selectedRestaurant.location.lng
                    }}
                  >
                  <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        onClick={this.onMarkerClick}
                        position={{lat:this.props.selectedRestaurant.location.lat, lng: this.props.selectedRestaurant.location.lng}} />
                      <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div>
                          <p>Restaurant Name : {this.props.selectedRestaurant.name}</p>
                          <p>Restaurant Address :{this.props.selectedRestaurant.location.address}</p>

                        </div>
                    </InfoWindow>
                  </Map>
                  
              </div>}
              <ul>
             <Grid>
               {!this.props.map && <Row>
               {items.map(restaurant => (
                  <Col xs={12} md={6} key={restaurant.name}>
                  <Panel>
                      <Panel.Body>
                        <Thumbnail src={restaurant.backgroundImageURL} alt="242x200"  onClick={(e) => this.showDetails(restaurant)}>
                          <h3>{restaurant.name}</h3>
                          <h5>{restaurant.category}</h5>
                          <p>
                            <Button bsStyle="primary">Details</Button>
                            &nbsp;
                            <Button bsStyle="default">Menu</Button>
                          </p>
                        </Thumbnail>
                      </Panel.Body>
                    </Panel>
                  </Col>
               ))}

               </Row>}
             </Grid>
             
            </ul>
            </div>
          );
        }
      }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC22S0x3Ojkp8bjnZ1COhxsDl8xmMDypBM'
})(DetailView);