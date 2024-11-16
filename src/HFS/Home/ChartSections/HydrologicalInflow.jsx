import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Map from "./Map";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;

const HydrologicalInflow = () => {
  const { date_range } = useContext(DataContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = {
        hydrological_inflow: {
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

          xaxis: {
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-20T00:00:00.000Z",
              "2018-09-21T00:00:00.000Z",
              "2018-09-22T00:00:00.000Z",
              "2018-09-23T00:00:00.000Z",
              "2018-09-24T00:00:00.000Z",
              "2018-09-25T00:00:00.000Z",
              "2018-09-26T00:00:00.000Z",
            ],
          },
        },
      };

      setOptionData((privOptions) => ({
        ...privOptions,
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

        xaxis: {
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-20T00:00:00.000Z",
            "2018-09-21T00:00:00.000Z",
            "2018-09-22T00:00:00.000Z",
            "2018-09-23T00:00:00.000Z",
            "2018-09-24T00:00:00.000Z",
            "2018-09-25T00:00:00.000Z",
            "2018-09-26T00:00:00.000Z",
          ],
        },
      }));
    } catch (error) {
      setOptionData((prevOptions) => ({
        ...prevOptions,
        series: [],
      }));
    }
  };

  const [optionData, setOptionData] = useState({
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
          "2018-09-20T00:00:00.000Z",
          "2018-09-21T00:00:00.000Z",
          "2018-09-22T00:00:00.000Z",
          "2018-09-23T00:00:00.000Z",
          "2018-09-24T00:00:00.000Z",
          "2018-09-25T00:00:00.000Z",
          "2018-09-26T00:00:00.000Z",
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
        title: {
          text: "Discharge in m ³/s",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    getData();
  }, [date_range]);

  return (
    <Container fluid>
      <Row>
        <Col xl={6}>
          <Card>
            <Row>
              <p className="fs-3 fw-semibold mx-4 mt-1">Hydrological Inflow</p>
            </Row>
            <hr className="p-0 m-0" />
            {optionData.series.length !== 0 && optionData?.options ? (
              <Chart
                options={optionData?.options}
                series={optionData?.series}
                type="area"
                height={400}
              />
            ) : (
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
              >
                <h3>Data not found</h3>
              </div>
            )}
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
