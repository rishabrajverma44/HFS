import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMapModule from "highcharts/modules/map";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";

HighchartsMapModule(Highcharts);

const Map = () => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const chartOptions = {
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
      legend: {
        enabled: false,
      },
    };

    setOptions(chartOptions);
  }, []);
  return (
    <Card className="px-2 md:px-0">
      <CardHeader className="p-1">
        <p className="fs-3" style={{ fontWeight: "500" }}>
          Chhukha Catchment Area
        </p>
      </CardHeader>
      <Row className="py-0">
        {options && (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={options}
          />
        )}
      </Row>
    </Card>
  );
};

export default Map;
