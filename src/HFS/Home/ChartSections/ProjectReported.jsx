import React from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ProjectReported = () => {
  const optionsData = {
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
    series: [
      {
        name: "Low",
        data: [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
          3, 3, 3, 3, 3, 3,
        ],
      },
      {
        name: "High",
        data: [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2,
        ],
      },
      {
        name: "medium",
        data: [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2,
        ],
      },
      {
        name: "Inflow",
        type: "line",
        data: [
          1.3, 1.2, 1.1, 1.45, 1.44, 1.65, 1.3, 1.22, 1.44, 1.11, 1.33, 1.32,
          1.67, 1.23, 1.345, 1.76, 1.3, 1.34, 1.4, 1.44, 1, 1.56, 1.45, 1.76,
          1.12, 1.44, 1.12, 1.33, 1.21,
        ],
        marker: {
          enabled: true,
        },
      },
    ],
  };

  const optionsData2 = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "01-08-2024",
        "02-08-2024",
        "03-08-2024",
        "04-08-2024",
        "05-08-2024",
        "06-08-2024",
        "07-08-2024",
      ],
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
    series: [
      {
        name: "TBL(top bound level)",
        data: [50, 45, 50, 40, 55, 45, 60],
      },
      {
        name: "HFL (high flood level)",
        data: [20, 33, 24, 32, 32, 28, 20],
      },
      {
        name: "FTL (full tank level)",
        data: [30, 22, 26, 28, 13, 27, 20],
      },
    ],
  };
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className="p-1">
            <p className="fs-3" style={{ fontWeight: "500" }}>
              Projected Report
            </p>
          </CardHeader>
          <HighchartsReact options={optionsData} highcharts={Highcharts} />
        </Card>
      </Col>
      <Col>
        <Card>
          <CardHeader className="p-1">
            <p className="fs-3" style={{ fontWeight: "500" }}>
              Reservoir condition
            </p>
          </CardHeader>
          <HighchartsReact options={optionsData2} highcharts={Highcharts} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectReported;
