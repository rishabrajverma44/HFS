import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, Col, Row } from "reactstrap";
import Map from "./Map";

const HydrologicalInflow = () => {
  const optionData = {
    series: [
      {
        name: "Real-Time",
        data: [0.033, 0.027, 0.029, 0.032, 0.035, 0.029, 0.034, 0.033],
      },
      {
        name: "Projected",
        data: [0.034, 0.028, 0.032, 0.03, 0.036, 0.03, 0.036, 0.031],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:30:00.000Z",
        ],
      },
      yaxis: {
        min: 0.02,
        tickAmount: 10,
        labels: {
          formatter: function (value) {
            return value.toFixed(3);
          },
        },
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <>
      <Row>
        <Col md={8} className="card">
          <Card>
            <Row className="card-header align-items-center d-flex p-1">
              <Col>
                <p className="fs-3" style={{ fontWeight: "500" }}>
                  Hydrological Inflow
                </p>
              </Col>
            </Row>

            <Chart
              options={optionData.options}
              series={optionData.series}
              type="area"
              height={350}
            />
          </Card>
        </Col>
        <Col className="">
          <Map />
        </Col>
      </Row>
    </>
  );
};

export default HydrologicalInflow;
