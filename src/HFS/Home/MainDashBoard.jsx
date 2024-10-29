import React, { useEffect, useState, useMemo } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import PowerData from "./ChartSections/PowerData";
import WeatherForecast from "./ChartSections/WeatherForecast";
import HydrologicalInflow from "./ChartSections/HydrologicalInflow";
import ProjectReported from "./ChartSections/ProjectReported";
import Table from "./Table/Table";

const baseurl = process.env.REACT_APP_API_BASE_URL;

const MainDashBoard = () => {
  const [power_generated, setPower_generated] = useState(0);
  const [current_inflow, setCurrent_inflow] = useState(0);
  const [water_level, setWater_level] = useState(0);
  const [power_generated_per, setPower_generated_per] = useState(0);
  const [current_inflow_per, setCurrent_inflow_per] = useState(0);
  const [water_level_per, setWater_level_per] = useState(0);

  const counterWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "POWER GENERATED",
      badge: "ri-arrow-right-up-line",
      badgeClass: "success",
      percentage: power_generated_per,
      counter: power_generated,
      bgcolor: power_generated_per > 0 ? "success" : "danger",
      icon: "ri-flashlight-fill",
      decimals: 0,
      suffix: " MW",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "CURRENT INFLOW",
      badge: "ri-arrow-right-down-line",
      badgeClass: current_inflow_per > 0 ? "success" : "danger",
      percentage: current_inflow_per,
      counter: current_inflow,
      bgcolor: "info",
      icon: "ri-windy-fill",
      decimals: 0,
      suffix: " m³/sec",
    },
    {
      id: 3,
      cardColor: "success",
      label: "WATER LEVEL",
      badge: "ri-arrow-right-up-line",
      badgeClass: water_level_per > 0 ? "success" : "danger",
      percentage: water_level_per,
      counter: water_level,
      bgcolor: "warning",
      icon: "ri-contrast-drop-2-line",
      decimals: 2,
      suffix: " Meter",
    },
  ];

  const fetchCounterData = async () => {
    try {
      const res = await fetch(`${baseurl}counter`);
      const jsonResult = await res.json();

      setPower_generated(jsonResult[0].power_generated);
      setPower_generated_per(jsonResult[0].power_generated_per);
      setCurrent_inflow(jsonResult[1].current_inflow);
      setCurrent_inflow_per(jsonResult[1].current_inflow_per);
      setWater_level(jsonResult[2].water_level);
      setWater_level_per(jsonResult[2].water_level_per);
    } catch (error) {
      console.log("error in project", error);
    }
  };

  useEffect(() => {
    fetchCounterData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="DashBoard" />

          <Row>
            {counterWidgets.map((item) => (
              <Col xl={4} md={6} key={item.id}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="fs-4 text-uppercase fw-medium text-muted text-truncate mb-0">
                          {item.label}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5 className={`fs-14 mb-0 text-${item.badgeClass}`}>
                          <i className={`fs-13 align-middle ${item.badge}`} />{" "}
                          {item.percentage}%
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <CountUp
                            start={0}
                            end={item.counter}
                            decimals={item.decimals}
                            suffix={item.suffix}
                            duration={4}
                          />
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span
                          className={`avatar-title rounded fs-3 bg-${item.bgcolor}-subtle`}
                        >
                          <i className={`text-${item.bgcolor} ${item.icon}`} />
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <PowerData />
          <WeatherForecast />
          <HydrologicalInflow />
          <ProjectReported />
          <Table />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MainDashBoard;
