import React, { useEffect, useState, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import PowerData from "./ChartSections/PowerData";
import WeatherForecast from "./ChartSections/WeatherForecast";
import HydrologicalInflow from "./ChartSections/HydrologicalInflow";
import ProjectReported from "./ChartSections/ProjectReported";
import Table from "./Table/Table";
import { DataContext } from "../../Layouts/dataContext";

const MainDashBoard = () => {
  const [power_generated, setPower_generated] = useState(320);
  const [current_inflow, setCurrent_inflow] = useState(213);
  const [water_level, setWater_level] = useState(15);
  const [power_generated_per, setPower_generated_per] = useState(16.24);
  const [current_inflow_per, setCurrent_inflow_per] = useState(-3.57);
  const [water_level_per, setWater_level_per] = useState(29.08);
  const { date_range } = useContext(DataContext);

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="DashBoard" />
          <Row>
            {counterWidgets.map((item) => (
              <Col xl={4} md={6} key={item.id}>
                <Card className="card-animate cursor-pointer">
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
        </Container>

        <HydrologicalInflow />
        <ProjectReported />
        <Table />
      </div>
    </React.Fragment>
  );
};

export default MainDashBoard;
