import React from "react";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FiaTM2IiwiYSI6ImNrdnh6NTV4NzBteGUybnFpdWlmZmtqamMifQ.mJkJlPdcH1m3_r1NqIPfXw'


export default class MapApp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lat:this.props.lat,
            lng:this.props.lon,
            zoom: 9,
        };
        this.mapContainer = React.createRef();
    }


    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/gabi36/ckvy8b2b23u5515n6736ax1wo',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }


    render() {
        return (
            <div>
                <div className="sidebar py-2">
                    Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                </div>
                <div ref={this.mapContainer} className="map-container"/>
            </div>
        )
    }
}