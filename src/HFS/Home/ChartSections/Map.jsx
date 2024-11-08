import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMapModule from "highcharts/modules/map";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;
const baseurl = process.env.REACT_APP_API_BASE_URL;

HighchartsMapModule(Highcharts);

const Map = () => {
  const position = [51.505, -0.09];
  const [options, setOptions] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        //const res = await axios.get(`${baseurl}date_basedData`);

        setOptions({
          title: {
            text: "",
          },
          credits: {
            enabled: false,
          },

          series: [
            {
              name: "Catchment Area",
              type: "map",
              mapData: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          [88.8142, 27.1805],
                          [89.4657, 26.7194],
                          [89.7445, 26.8757],
                          [90.5857, 26.8074],
                          [91.2175, 26.8086],
                          [91.6966, 27.7714],
                          [91.8728, 27.9196],
                          [92.1037, 28.0226],
                          [91.9519, 28.3084],
                          [91.2479, 28.4311],
                          [90.7305, 28.0649],
                          [90.3702, 28.0321],
                          [89.7445, 27.7266],
                          [89.382, 27.926],
                          [88.8142, 27.1805],
                        ],
                      ],
                    },
                    properties: {
                      name: "Chhukha catchment",
                      "iso-a2": "BT",
                    },
                  },
                ],
              },
              data: [
                {
                  name: "Chhukha catchment",
                  "iso-a2": "BT",
                  value: 1,
                },
              ],
              joinBy: ["iso-a2", "iso-a2"],
              states: {
                hover: {
                  color: "#3DEAAF",
                },
              },
              tooltip: {
                pointFormat: "<b>{point.name}</b>",
                followPointer: true,
              },
            },
          ],
        });

        if (res && res.bhutan_map) {
          setData(res.bhutan_map);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <Card className="mx-2 mb-2">
      <Row className="card-header align-items-center d-flex p-1">
        <Col>
          <p className="fs-3 fw-semibold">Chhukha Catchment Area</p>
        </Col>
        <hr />

        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"mapChart"}
          options={options}
        />
      </Row>
    </Card>
  );
};

export default Map;
