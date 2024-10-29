import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const baseurl = process.env.REACT_APP_API_BASE_URL;

const PowerData = () => {
  const [condition, setCondition] = useState("hourly");
  const [dataSeries, setDataSeries] = useState({});
  const [categories, setCategories] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const fetchCounterData = useCallback(async () => {
    try {
      const res = await fetch(`${baseurl}powerdata_overview`);
      const jsonResult = await res.json();
      setCategories(jsonResult.categories);
      setDataSeries(jsonResult.data_series);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCounterData();
  }, [fetchCounterData]);

  useEffect(() => {
    const options = {
      chart: { zoomType: "xy" },
      credits: { enabled: false },
      title: { text: "" },
      xAxis: { categories: categories[condition] || [], crosshair: true },
      yAxis: [
        {
          labels: {
            format: "{value} MW",
            style: { color: Highcharts.getOptions().colors[1] },
          },
          title: {
            text: "ACTUAL POWER",
            style: { color: Highcharts.getOptions().colors[1] },
          },
          opposite: true,
        },
        {
          gridLineWidth: 0,
          title: { text: "PROJECTED POWER", style: { color: "#00E272" } },
          labels: { format: "{value} MW", style: { color: "#00E272" } },
        },
        {
          gridLineWidth: 0,
          title: { text: "INFLOW", style: { color: "#FE6A35" } },
          labels: { format: "{value} m³/sec", style: { color: "#FE6A35" } },
          opposite: true,
        },
      ],
      tooltip: { shared: true },
      series: [
        {
          name: "ACTUAL POWER",
          type: "area",
          color: "#efefef",
          yAxis: 0,
          data: dataSeries[condition]?.current_power || [],
          tooltip: { valueSuffix: " MW" },
        },
        {
          name: "PROJECTED POWER",
          type: "column",
          color: "#00E272",
          yAxis: 1,
          data: dataSeries[condition]?.projected_power || [],
          tooltip: { valueSuffix: " MW" },
        },
        {
          name: "INFLOW",
          type: "line",
          dashStyle: "shortdot",
          color: "#FE6A35",
          yAxis: 2,
          data: dataSeries[condition]?.inflow || [],
          tooltip: { valueSuffix: " m³/sec" },
        },
      ],
    };
    setChartOptions(options);
  }, [condition, dataSeries, categories]);

  return (
    <Row>
      <Card>
        <Row className="card-header align-items-center d-flex p-1">
          <Col>
            <p className="fs-3 fw-semibold">Power Data Overview</p>
          </Col>
          <Col md={3} className="d-flex justify-content-around">
            {["hourly", "daily", "weekly"].map((type) => (
              <Button
                key={type}
                onClick={() => setCondition(type)}
                className={`btn-soft-secondary ${
                  condition === type ? "bg-secondary text-white" : ""
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </Col>
        </Row>
        <CardBody>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </CardBody>
      </Card>
    </Row>
  );
};

export default PowerData;
