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

        const res = {
          bhutan_map: {
            series: [
              {
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
          },
        };

        if (res && res.bhutan_map) {
          setData(res.bhutan_map);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      map: "custom/world",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: false,
    },
    series: [],
    legend: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data) {
      setOptions((prevOptions) => {
        return {
          ...prevOptions,
          series: data?.series || [],
        };
      });
    }
  }, [data]);

  // const [options, setOptions] = useState(null);

  // useEffect(() => {
  //   const fetchMapData = async () => {
  //     const geojson = await fetch("http://localhost:4000/bhutan").then(
  //       (response) => response.json()
  //     );

  //     // Prepare the geojson
  //     const regions = Highcharts.geojson(geojson, "map");
  //     const rivers = Highcharts.geojson(geojson, "mapline");
  //     const cities = Highcharts.geojson(geojson, "mappoint");

  //     // Customize city labels as needed
  //     const specialCityLabels = {
  //       Thimphu: { align: "right", y: -5 },
  //       Paro: { y: 5 },
  //       Punakha: { y: -5 },
  //       // Add any additional Bhutan cities here
  //     };

  //     // Customize region labels and positioning
  //     regions.forEach((region) => {
  //       if (region.properties.shapeid === "someSpecificID") {
  //         region.dataLabels = { enabled: false }; // Disable label for specific region
  //       }
  //       if (region.properties.shapeid === "anotherSpecificID") {
  //         region.dataLabels = { style: { color: "#333333" } }; // Change color for specific region
  //       }
  //       // Adjust positioning if needed, similar to middleY in original
  //       if (region.properties.shapeid === "yetAnotherID") {
  //         region.middleY = 0.3;
  //       }
  //     });

  //     cities.forEach((city) => {
  //       if (specialCityLabels[city.name]) {
  //         city.dataLabels = specialCityLabels[city.name];
  //       }
  //     });

  //     setOptions({
  //       chart: {
  //         map: geojson,
  //       },
  //       title: {
  //         text: "Bhutan Map with Multiple Geometry Types",
  //       },
  //       accessibility: {
  //         point: {
  //           valueDescriptionFormat: "{xDescription}.",
  //         },
  //         description:
  //           "Map of Bhutan, showing regions, rivers, and cities with Highcharts Maps.",
  //       },
  //       mapNavigation: {
  //         enabled: true,
  //         buttonOptions: { verticalAlign: "bottom" },
  //       },
  //       series: [
  //         {
  //           name: "Regions",
  //           data: regions,
  //           color: Highcharts.color(Highcharts.getOptions().colors[2])
  //             .setOpacity(0.75)
  //             .get(),
  //           states: {
  //             hover: { color: Highcharts.getOptions().colors[4] },
  //           },
  //           dataLabels: {
  //             enabled: true,
  //             format: "{point.properties.shape1}", // Use region name property
  //             style: {
  //               width: "80px",
  //               textTransform: "uppercase",
  //               fontWeight: "normal",
  //               textOutline: "none",
  //               color: "#888",
  //             },
  //           },
  //           tooltip: { pointFormat: "{point.properties.shape1}" },
  //         },
  //         {
  //           name: "Rivers",
  //           type: "mapline",
  //           data: rivers,
  //           states: { hover: { lineWidth: 3 } },
  //           color: Highcharts.getOptions().colors[0],
  //           tooltip: { pointFormat: "{point.properties.NAME}" },
  //         },
  //         {
  //           name: "Cities",
  //           type: "mappoint",
  //           data: cities,
  //           color: "black",
  //           marker: { radius: 2 },
  //           dataLabels: {
  //             align: "left",
  //             verticalAlign: "middle",
  //           },
  //           animation: false,
  //           tooltip: { pointFormat: "{point.name}" },
  //         },
  //       ],
  //     });
  //   };

  //   fetchMapData();
  // }, []);

  return (
    <Card className="mx-2 mb-2">
      <Row className="card-header align-items-center d-flex p-1">
        <Col>
          <p className="fs-3 fw-semibold">Chhukha Catchment Area</p>
        </Col>
        <hr />
        {/* <Row className="py-0">
          {options && (
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"mapChart"}
              options={options}
            />
          )}
        </Row> */}

        <Row>
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"mapChart"}
              options={options}
            />
          </div>
        </Row>
      </Row>
    </Card>
  );
};

export default Map;
