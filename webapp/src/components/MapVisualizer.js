import { Feature, Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";
import React, { useEffect, useRef } from "react";

/** A component responsible for displaying a map and its data to the user. */
export default function MapVisualizer() {
	const vectorSource = useRef(new VectorSource());
	const refMapDiv = useRef();

	// Component initialization
	useEffect(() => {
		new Map({
			target: refMapDiv.current,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new VectorLayer({
					source: new VectorSource({
						format: new GeoJSON(),
						url: "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/microrregiao/geojson/microrregiao.json",
					}),
					style: new Style({
						stroke: new Stroke({ color: "#00fa" }),
						fill: new Fill({ color: "#00a1" }),
					}),
				}),
				new VectorLayer({
					source: vectorSource.current,
					style: new Style({
						image: new Circle({
							radius: 3,
							stroke: new Stroke({ color: "#f00" }),
							fill: new Fill({ color: "#f001" }),
						})
					}),
				})
			],
			view: new View({
				center: fromLonLat([-44.3068, -2.53073]),
				zoom: 3,
			}),
		});
	}, []);

	function addPointToMap() {
		const newFeature = new Feature();
		newFeature.setGeometry(new Point(fromLonLat([-44.3068, -2.53073])));
		vectorSource.current.addFeature(newFeature);
	}

	return (
		<div className="h-screen flex flex-col">
			<div ref={refMapDiv} className="bg-blue-300 w-full h-64 flex-grow" />
			<div>
				<button onClick={addPointToMap}>Plus  aaa</button>
			</div>
		</div>
	);
}