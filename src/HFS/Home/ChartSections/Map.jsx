import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
  Popup,
} from "react-leaflet";
import { Card, Col, Row } from "reactstrap";
import "leaflet/dist/leaflet.css";
import baseLayer from "../MapData/baseData.json";
import riverLayer from "../MapData/riverData.json";

const center = [27.5, 89.5];

const onEachRiverFeature = (feature, layer) => {
  if (feature.properties) {
    layer.bindPopup(
      `<b>River Information</b><br />
      OBJECTID: ${feature.properties.OBJECTID} <br />
      Arc ID: ${feature.properties.arcid} <br />
      Grid Code: ${feature.properties.grid_code} <br />
      From Node: ${feature.properties.from_node} <br />
      To Node: ${feature.properties.to_node} <br />
      Length: ${feature.properties.Shape_Leng.toFixed(2)} meters`
    );
  }
};

const Map = () => {
  useEffect(() => {
    const leafletContainer = document.querySelector(".leaflet-container");
    if (leafletContainer) {
      leafletContainer.style.zIndex = "2";
    } else {
      console.error("leaflet-container not found!");
    }
  }, []);
  return (
    <Card className="mx-2 mb-2">
      <Row className="card-header align-items-center d-flex p-1">
        <Col>
          <p className="fs-3 fw-semibold">Chhukha Catchment Area</p>
        </Col>
        <hr />

        <MapContainer
          center={center}
          zoom={9}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
          attributionControl={false}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga&region=IN&gl=IN" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>

            {baseLayer && (
              <LayersControl.Overlay checked name="Base Layer">
                <GeoJSON
                  data={baseLayer}
                  style={{ color: "green", weight: 2 }}
                />
              </LayersControl.Overlay>
            )}

            {riverLayer && (
              <LayersControl.Overlay checked name="River Layer">
                <GeoJSON
                  data={riverLayer}
                  style={{ color: "blue", weight: 2 }}
                  onEachFeature={onEachRiverFeature}
                />
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </MapContainer>
      </Row>
    </Card>
  );
};

export default Map;
