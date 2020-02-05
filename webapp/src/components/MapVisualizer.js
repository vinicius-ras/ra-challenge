import { Feature, Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";
import React from "react";

/** A component responsible for displaying a map and its data to the user. */
export default class MapVisualizer extends React.Component {
	/** Constructor. */
	constructor(props) {
		super(props);
		this.vectorSource = new VectorSource();
		this.refMapDiv = React.createRef();
	}


	/** Initializes the component after it has been rendered for the first time. */
	componentDidMount() {
		// Create and configure the map
		new Map({
			target: this.refMapDiv.current,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new VectorLayer({
					source: new VectorSource({
						format: new GeoJSON(),
						url: "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/geojson/uf.json",
					}),
					style: new Style({
						stroke: new Stroke({ color: "#00fa" }),
						fill: new Fill({ color: "#00a1" }),
					}),
				}),
				new VectorLayer({
					source: this.vectorSource,
					style: new Style({
						image: new Circle({
							radius: 5,
							stroke: new Stroke({ color: "#f00" }),
							fill: new Fill({ color: "#f00a" }),
						}),
					}),
				})
			],
			view: new View({
				center: fromLonLat([-55.347019598847226, -25.259439487386699]),
				zoom: 4,
			}),
		});

		// Show complaint locations, if any
		this.updateMapPoints();
	}


	/** Called everytime this component re-renders. */
	componentDidUpdate() {
		this.updateMapPoints();
	}


	/** Utility method for adding a point to the map.
	 * @param coordinates The coordinates of the point to be added to the map. */
	updateMapPoints() {
		this.vectorSource.clear();

		const {complaintLocations} = this.props;
		if (!complaintLocations)
			return;

		complaintLocations.forEach(cLoc => {
			// Add each complaint location to the map
			const newFeature = new Feature();
			newFeature.setGeometry(new Point(fromLonLat(cLoc.location.coordinates)));
			this.vectorSource.addFeature(newFeature);
		});
	}


	/** Renders the component. */
	render() {
		return (
			<div className="w-full h-full min-h-screen" ref={this.refMapDiv} />
		);
	}
}