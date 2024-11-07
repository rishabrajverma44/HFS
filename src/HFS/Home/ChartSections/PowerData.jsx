import React, { useEffect, useState, useContext } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;

const PowerData = () => {
  const [condition, setCondition] = useState("daily");
  const [dataSeries, setDataSeries] = useState({});
  const [categories, setCategories] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { date_range } = useContext(DataContext);

  const getData = async (date_range) => {
    try {
      const res = await axios.post(`${baseurl1}historical-data/`, {
        station_id: 1,
        start_date: date_range.start_date,
        end_date: date_range.end_date,
      });
      const formatedData = res || [];
      setCategories(formatedData?.categories || {});
      setDataSeries(formatedData?.data_series || {});
    } catch (error) {
      setDataSeries({});
      console.error("Error in fetching data:", error);
    }
  };

  useEffect(() => {
    const options = {
      chart: { zoomType: "xy" },
      credits: { enabled: false },
      title: { text: "" },
      xAxis: { categories: categories[condition] || [], crosshair: true },
      yAxis: [
        {
          labels: {
            format: "{value} GWh",
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
          labels: { format: "{value} GWh", style: { color: "#00E272" } },
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
          tooltip: { valueSuffix: " GWh" },
        },
        {
          name: "PROJECTED POWER",
          type: "column",
          color: "#00E272",
          yAxis: 1,
          data: dataSeries[condition]?.projected_power || [],
          tooltip: { valueSuffix: " GWh" },
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

  useEffect(() => {
    if (date_range) {
      getData(date_range);
    }
  }, [date_range]);

  return (
    <Row>
      <Card>
        <Row className="card-header align-items-center d-flex p-1">
          <Col>
            <p className="fs-3 fw-semibold">Power Generation Overview</p>
          </Col>
          <Col md={3} className="d-flex justify-content-around">
            {["hourly", "daily"].map((type) => (
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
          {Object.keys(dataSeries).length !== 0 ? (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          ) : (
            <div
              className="text-center d-flex justify-content-center align-items-center"
              style={{ minHeight: "400px" }}
            >
              <h3>Data not found</h3>
            </div>
          )}
        </CardBody>
      </Card>
    </Row>
  );
};

export default PowerData;
