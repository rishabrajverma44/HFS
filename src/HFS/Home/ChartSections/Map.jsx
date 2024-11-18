import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMapModule from "highcharts/modules/map";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { DataContext } from "../../../Layouts/dataContext";
import axios from "axios";
import mapCordinate from "../../../common/mapCordinate.json";
const baseurl1 = process.env.REACT_APP_API_BASE_URL_1;
const baseurl = process.env.REACT_APP_API_BASE_URL;

HighchartsMapModule(Highcharts);

const Map = () => {
  const position = [51.505, -0.09];
  const [options, setOptions] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        //const res = await axios.get(`${baseurl}date_basedData`);

        setOptions({
          chart: {
            type: "map",
          },
          title: {
            text: "Bhutan Map",
          },
          credits: {
            enabled: false,
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: "bottom",
            },
          },

          series: [
            {
              type: "map",
              name: "Chhukha Dam Catchment",
              mapData: mapCordinate,
              data: [
                {
                  name: "Chhukka",
                  id: "BT12",
                  value: 1,
                },
              ],
              joinBy: ["id", "id"],
              states: {
                hover: {
                  color: "#3DEAAF",
                },
              },
              tooltip: {
                pointFormat: "<b>{point.name}</b>",
              },
            },
          ],
        });

        if (res && res.bhutan_map) {
          setData(res.bhutan_map);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <Card>
      <Row>
        <p className="fs-3 fw-semibold mx-4 mt-1">Chhukha Catchment Area</p>
      </Row>
      <hr className="p-0 m-0" />
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={options}
      />
    </Card>
  );
};

export default Map;
