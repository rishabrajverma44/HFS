import React, { useMemo, useState } from "react";
import printJS from "print-js";
import { Card, Col, Container, Row } from "reactstrap";

const Table = () => {
  const demoData = useMemo(
    () => [
      {
        dt: "07-08-2024 12:00",
        precipitionActual: "0.0",
        sdActual: "0.11",
        wlActual: "1.25",
        inflowActual: "0.35",
        precipitionForecasted: "0.1",
        sdForcasted: "0.1",
        wlForcasted: "1.22",
        inflowForcasted: "0.36",
        powerAl: "150",
        powerFr: "152",
        temperature: "22.5",
        windDirection: "180 W",
        humidity: "60",
      },
      {
        dt: "07-08-2024 12:15",
        precipitionActual: "0.1",
        sdActual: "0.12",
        wlActual: "1.26",
        inflowActual: "0.37",
        precipitionForecasted: "0.1",
        sdForcasted: "0.11",
        wlForcasted: "1.23",
        inflowForcasted: "0.36",
        powerAl: "152",
        powerFr: "150",
        temperature: "23.0",
        windDirection: "190 SW",
        humidity: "62",
      },
      {
        dt: "07-08-2024 12:30",
        precipitionActual: "0.2",
        sdActual: "0.10",
        wlActual: "1.28",
        inflowActual: "0.39",
        precipitionForecasted: "0.2",
        sdForcasted: "0.1",
        wlForcasted: "1.24",
        inflowForcasted: "0.38",
        powerAl: "154",
        powerFr: "153",
        temperature: "23.5",
        windDirection: "200 SW",
        humidity: "65",
      },
      {
        dt: "07-08-2024 12:45",
        precipitionActual: "0.3",
        sdActual: "0.09",
        wlActual: "1.30",
        inflowActual: "0.40",
        precipitionForecasted: "0.3",
        sdForcasted: "0.12",
        wlForcasted: "1.25",
        inflowForcasted: "0.39",
        powerAl: "156",
        powerFr: "155",
        temperature: "24.0",
        windDirection: "210 SW",
        humidity: "66",
      },
      {
        dt: "07-08-2024 13:00",
        precipitionActual: "0.4",
        sdActual: "0.08",
        wlActual: "1.32",
        inflowActual: "0.42",
        precipitionForecasted: "0.4",
        sdForcasted: "0.13",
        wlForcasted: "1.27",
        inflowForcasted: "0.40",
        powerAl: "158",
        powerFr: "156",
        temperature: "24.5",
        windDirection: "220 SW",
        humidity: "68",
      },
      {
        dt: "07-08-2024 13:15",
        precipitionActual: "0.5",
        sdActual: "0.07",
        wlActual: "1.35",
        inflowActual: "0.43",
        precipitionForecasted: "0.5",
        sdForcasted: "0.15",
        wlForcasted: "1.29",
        inflowForcasted: "0.41",
        powerAl: "160",
        powerFr: "158",
        temperature: "25.0",
        windDirection: "230 SW",
        humidity: "70",
      },
      {
        dt: "07-08-2024 13:30",
        precipitionActual: "0.6",
        sdActual: "0.06",
        wlActual: "1.38",
        inflowActual: "0.45",
        precipitionForecasted: "0.6",
        sdForcasted: "0.16",
        wlForcasted: "1.31",
        inflowForcasted: "0.43",
        powerAl: "162",
        powerFr: "159",
        temperature: "25.5",
        windDirection: "240 SW",
        humidity: "72",
      },
      {
        dt: "07-08-2024 13:45",
        precipitionActual: "0.7",
        sdActual: "0.05",
        wlActual: "1.40",
        inflowActual: "0.47",
        precipitionForecasted: "0.7",
        sdForcasted: "0.17",
        wlForcasted: "1.32",
        inflowForcasted: "0.44",
        powerAl: "164",
        powerFr: "160",
        temperature: "26.0",
        windDirection: "250 SW",
        humidity: "74",
      },
      {
        dt: "07-08-2024 14:00",
        precipitionActual: "0.8",
        sdActual: "0.04",
        wlActual: "1.42",
        inflowActual: "0.50",
        precipitionForecasted: "0.8",
        sdForcasted: "0.18",
        wlForcasted: "1.34",
        inflowForcasted: "0.46",
        powerAl: "166",
        powerFr: "162",
        temperature: "26.5",
        windDirection: "260 SW",
        humidity: "76",
      },
      {
        dt: "07-08-2024 14:15",
        precipitionActual: "0.9",
        sdActual: "0.03",
        wlActual: "1.45",
        inflowActual: "0.52",
        precipitionForecasted: "0.9",
        sdForcasted: "0.19",
        wlForcasted: "1.36",
        inflowForcasted: "0.47",
        powerAl: "168",
        powerFr: "163",
        temperature: "27.0",
        windDirection: "270 SW",
        humidity: "78",
      },
      {
        dt: "07-08-2024 14:30",
        precipitionActual: "1.0",
        sdActual: "0.02",
        wlActual: "1.47",
        inflowActual: "0.55",
        precipitionForecasted: "1.0",
        sdForcasted: "0.20",
        wlForcasted: "1.38",
        inflowForcasted: "0.49",
        powerAl: "170",
        powerFr: "165",
        temperature: "27.5",
        windDirection: "280 SW",
        humidity: "80",
      },
      // Add more data as needed
    ],
    []
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const filteredData = demoData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const componentRef = React.useRef();

  return (
    <Container fluid>
      <Row>
        <Card>
          <Row className="card-header align-items-center d-flex p-1">
            <Col>
              <p className="fs-3 fw-semibold">Weather Forecast Table</p>
            </Col>
          </Row>
          <Row>
            <Row className="align-items-center d-flex py-1">
              <Col className="d-flex gap-3">
                <input
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control search bg-light border-light"
                />
                <button
                  className="btn btn-success"
                  onClick={() =>
                    printJS({ printable: componentRef.current, type: "html" })
                  }
                >
                  <i className="fa fa-print"></i> Print
                </button>
              </Col>
            </Row>
            <div className="table-responsive mt-2" ref={componentRef}>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th
                      className="fw-medium text-center"
                      rowSpan="2"
                      style={{ width: "180px" }}
                    >
                      Date & Time
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Precipitation (mm)
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Snowpack Depth (cm)
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Water Levels (m)
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Humidity (%)
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Temperature (°C)
                    </th>
                    <th className="fw-medium text-center" rowSpan="2">
                      Wind Direction (°)
                    </th>
                    <th className="fw-medium text-center" colSpan="2">
                      Actual
                    </th>
                    <th className="fw-medium text-center" colSpan="2">
                      Projected
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-medium">Inflow (m³/s)</th>
                    <th className="fw-medium">Power Generation (mw)</th>
                    <th className="fw-medium">Inflow (m³/s)</th>
                    <th className="fw-medium">
                      Power Generation Projected (mw)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((row, index) => (
                      <tr key={index}>
                        <td className="text-center">{row.dt}</td>
                        <td className="text-center">{row.precipitionActual}</td>
                        <td className="text-center">{row.sdActual}</td>
                        <td className="text-center">{row.wlActual}</td>
                        <td className="text-center">{row.humidity}</td>
                        <td className="text-center">{row.temperature}</td>
                        <td className="text-center">{row.windDirection}</td>
                        <td className="text-center">{row.inflowActual}</td>
                        <td className="text-center">{row.powerAl}</td>
                        <td className="text-center">{row.inflowForcasted}</td>
                        <td className="text-center">{row.powerFr}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="d-flex justify-content-between p-3">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages - 1}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div> */}
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default Table;
