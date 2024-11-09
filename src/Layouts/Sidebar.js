import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import TwoColumnLayout from "./TwoColumnLayout";
import { Button, Container, Row } from "reactstrap";
import HorizontalLayout from "./HorizontalLayout";
import Flatpickr from "react-flatpickr";
import { toast, ToastContainer } from "react-toastify";
import { DataContext } from "./dataContext";

const Sidebar = ({ layoutType }) => {
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });
  const { setDate_range } = useContext(DataContext);
  const today = new Date();

  const [dateRange, setDateRange] = useState([
    // today,
    // new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),

    new Date("2023-01-01"),
    new Date("2023-01-15"),
  ]);

  const handleDateChange = (selectedDates) => {
    if (selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      if (differenceInDays > 15) {
        toast.error("Please select a range upto 15 days");
        const newEndDate = new Date(
          startDate.getTime() + 15 * 24 * 60 * 60 * 1000
        );
        setDateRange([startDate, newEndDate]);
      } else {
        setDateRange(selectedDates);
      }
    } else {
      setDateRange(selectedDates);
    }
  };

  const formateDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const dateFilter = async () => {
    if (dateRange.length === 2) {
      const start_date = formateDate(new Date(dateRange[0]));
      const end_date = formateDate(new Date(dateRange[1]));
      if (start_date == end_date) {
        toast.warning("Please select date in range");
      } else if (start_date && end_date) {
        const date_range = { start_date, end_date };
        setDate_range(date_range);
      } else {
        console.error("Fetched data is null or undefined");
      }
    } else {
      toast.error("Please select Date");
    }
  };

  useEffect(() => {
    dateFilter();
  }, []);

  const addEventListenerOnSmHoverMenu = () => {
    if (
      document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
    ) {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active"
      );
    } else if (
      document.documentElement.getAttribute("data-sidebar-size") ===
      "sm-hover-active"
    ) {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="72" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="47" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="72" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="47" />
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul
                className="navbar-nav d-flex justify-content-between"
                id="navbar-nav"
              >
                <div className="d-flex">
                  {" "}
                  <HorizontalLayout />
                  <div className="date">
                    <Row className="float-right g-3 mb-0 align-items-center">
                      <div className="col-sm-auto">
                        <div className="input-group">
                          <Flatpickr
                            className="form-control border-0 dash-filter-picker shadow"
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                              maxDate: new Date("2025-01-01"),
                            }}
                            value={dateRange}
                            onChange={handleDateChange}
                          />
                          <div className="input-group-text bg-primary border-primary text-white">
                            <i className="ri-calendar-2-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-auto d-flex justify-content-center aling-item-center gap-2 p-1">
                        <Button onClick={dateFilter}>Search</Button>
                        <Button
                          color="primary"
                          onClick={() =>
                            setDateRange([
                              // today,
                              // new Date(
                              //   today.getTime() + 15 * 24 * 60 * 60 * 1000
                              // ),
                              new Date("2023-01-01"),
                              new Date("2023-01-15"),
                            ])
                          }
                        >
                          Reset
                        </Button>
                      </div>
                    </Row>
                  </div>
                </div>
              </ul>
            </Container>
          </div>
        ) : layoutType === "twocolumn" ? (
          <React.Fragment>
            <TwoColumnLayout layoutType={layoutType} />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
