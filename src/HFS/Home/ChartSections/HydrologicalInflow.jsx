import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Map from "./Map";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;

const HydrologicalInflow = () => {
  const { date_range } = useContext(DataContext);
  const [hydrological, setHydrological] = useState({
    chart: {
      type: "areaspline",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      categories: undefined,
      labels: {
        rotation: 0,
      },
      min: Date.parse("2018-09-19T00:00:00"),
      max: Date.parse("2018-09-29T00:00:00"),
    },
    yAxis: {
      min: 0,
      tickAmount: 15,
      title: {
        text: "Discharge in m³/s",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    series: [
      {
        name: "Real-Time",
        color: "rgba(0,143,251, 0.8)",
        lineWidth: 4,
        data: [
          [Date.parse("2018-09-19T00:00:00"), 32.7012],
          [Date.parse("2018-09-20T00:00:00"), 33.8053],
          [Date.parse("2018-09-21T00:00:00"), 34.2578],
          [Date.parse("2018-09-22T00:00:00"), 30.5071],
          [Date.parse("2018-09-23T00:00:00"), 31.7812],
          [Date.parse("2018-09-24T00:00:00"), 33.0478],
          [Date.parse("2018-09-25T00:00:00"), 32.4857],
          [Date.parse("2018-09-26T00:00:00"), 33.1694],
          [Date.parse("2018-09-27T00:00:00"), 34.1189],
          [Date.parse("2018-09-28T00:00:00"), 30.3872],
          [Date.parse("2018-09-29T00:00:00"), 31.7531],
        ],
        marker: {
          enabled: false,
        },
      },
      {
        name: "Projected",
        color: "rgba(0,227,150, 0.8)",
        lineWidth: 4,
        data: [
          [Date.parse("2018-09-19T00:00:00"), 32.4811],
          [Date.parse("2018-09-20T00:00:00"), 33.7512],
          [Date.parse("2018-09-21T00:00:00"), 37.5325],
          [Date.parse("2018-09-22T00:00:00"), 32.7289],
          [Date.parse("2018-09-23T00:00:00"), 30.5124],
          [Date.parse("2018-09-24T00:00:00"), 36.9981],
          [Date.parse("2018-09-25T00:00:00"), 35.8239],
          [Date.parse("2018-09-26T00:00:00"), 34.5462],
          [Date.parse("2018-09-27T00:00:00"), 36.0148],
          [Date.parse("2018-09-28T00:00:00"), 33.9854],
          [Date.parse("2018-09-29T00:00:00"), 34.6278],
        ],
        marker: {
          enabled: false,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  });

  // useEffect(() => {
  //   getData();
  // }, [date_range]
  return (
    <Container fluid>
      <Row>
        <Col xl={6}>
          <Card>
            <Row>
              <p className="fs-3 fw-semibold mx-4 mt-1">Hydrological Inflow</p>
            </Row>
            <hr className="p-0 m-0" />

            <HighchartsReact highcharts={Highcharts} options={hydrological} />
          </Card>
        </Col>

        <Col xl={6}>
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default HydrologicalInflow;
