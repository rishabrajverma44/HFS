import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;

const ProjectReported = () => {
  const { date_range } = useContext(DataContext);
  const [resDataReservoir, setResDataReservoir] = useState(null);
  const [resDataProjected, setResDataProjected] = useState(null);

  const [optionsData1, setOptionData1] = useState({
    chart: {
      type: "area",
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.category}, {point.y:.1f} feet, {point.percentage:.1f}%.",
      },
    },
    xAxis: {
      title: {
        text: "Time (minutes)",
      },
      min: 0,
      tickInterval: 2,
      labels: {
        formatter: function () {
          const hours = Math.floor(this.value / 4);
          const minutes = (this.value % 4) * 15;
          return `${hours}:${minutes === 0 ? "00" : minutes}`;
        },
      },
    },
    yAxis: {
      labels: {
        format: "{value}",
      },
      title: {
        text: "Feet",
      },
      min: 0,
      max: 7,
      tickInterval: 1,
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>' +
        ": <b>{point.y:.1f} feet</b><br/>",
      split: true,
    },
    plotOptions: {
      series: {
        pointStart: 0,
      },
      area: {
        stacking: "normal",
        marker: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });

  const [optionsData2, setOptionData2] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },

    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "TBL",
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });

  const getData = async () => {
    try {
      const res = await axios.post(`${baseurl1}reservoir-Condition/`, {
        station_id: 1,
        start_date: date_range.start_date,
        end_date: date_range.end_date,
      });
      setResDataReservoir(res.data);
    } catch (error) {
      setResDataReservoir(null);
      console.error("Error in fetching project reported: resivior", error);
    }
  };

  const projectedReport = async () => {
    // try {
    //   const res = await axios.post(`${baseurl1}real-time-minute/`, {
    //     station_id: 1,
    //     start_date: date_range.start_date,
    //   });
    //   setResDataProjected(res.data);
    //   //console.log(resDataProjected);
    // } catch (error) {
    //   setResDataProjected(null);
    //   console.error("Error in fetching project reported:", error);
    // }
  };

  useEffect(() => {
    getData();
    projectedReport();
  }, [date_range]);

  useEffect(() => {
    if (resDataReservoir) {
      setOptionData1((previousOptions) => ({
        ...previousOptions,
        series: [
          {
            name: "Low",
            data: [
              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
              3, 3, 3, 3, 3, 3, 3,
            ],
          },
          {
            name: "High",
            data: [
              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2,
            ],
          },
          {
            name: "Medium",
            data: [
              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
              2, 2, 2, 2, 2, 2, 2,
            ],
          },
          {
            name: "Inflow",
            type: "line",
            data: [
              1.3, 1.2, 1.1, 1.45, 1.44, 1.65, 1.3, 1.22, 1.44, 1.11, 1.33,
              1.32, 1.67, 1.23, 1.345, 1.76, 1.3, 1.34, 1.4, 1.44, 1, 1.56,
              1.45, 1.76, 1.12, 1.44, 1.12, 1.33, 1.21,
            ],
            marker: {
              enabled: true,
            },
          },
        ],
      }));
      setOptionData2((previousOptions) => ({
        ...previousOptions,
        xAxis: {
          categories: resDataReservoir.date,
        },
        series: [
          {
            name: "TBL (top bound level)",
            data: resDataReservoir.top_boundary_level,
          },
          {
            name: "HFL (high flood level)",
            data: resDataReservoir.high_boundary_level,
          },
          {
            name: "FTL (full tank level)",
            data: resDataReservoir.full_tank_level,
          },
        ],
      }));
    }
  }, [date_range, resDataReservoir, resDataProjected]);

  return (
    <Row className="mt-3">
      <Col xl={6} className="px-0">
        <Card className="m-0 p-0 mt-2">
          <CardHeader className="p-1">
            <p className="fs-3 fw-semibold mx-2">Projected Report</p>
          </CardHeader>
          {optionsData1 ? (
            <HighchartsReact options={optionsData1} highcharts={Highcharts} />
          ) : (
            <div
              className="text-center d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <h3>Data not found</h3>
            </div>
          )}
        </Card>
      </Col>
      <Col xl={6} className="px-2">
        <Card className="m-0 p-0 md:mt-0 mt-2">
          <CardHeader className="p-1">
            <p className="fs-3 fw-semibold mx-2">Reservoir Condition</p>
          </CardHeader>
          {resDataReservoir ? (
            <HighchartsReact options={optionsData2} highcharts={Highcharts} />
          ) : (
            <div>
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
              >
                <h3>Data not found</h3>
              </div>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectReported;
