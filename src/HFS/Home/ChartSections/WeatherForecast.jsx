import React, { useContext, useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsWindbarb from "highcharts/modules/windbarb";
import HighchartsMore from "highcharts/highcharts-more";
import { Card, CardBody, Col, Row } from "reactstrap";
import { DataContext } from "../../../Layouts/dataContext";

HighchartsMore(Highcharts);
HighchartsWindbarb(Highcharts);

class Meteogram {
  constructor(json, forecast_container) {
    if (!json || !forecast_container) {
      console.error("Invalid arguments for Meteogram constructor");
      return;
    }
    this.symbols = [];
    this.precipitations = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];
    this.json = json;
    this.forecast_container = forecast_container;
    this.parseYrData();
  }

  static dictionary = {
    clearsky: {
      symbol: "01",
      text: "Clear sky",
    },
    fair: {
      symbol: "02",
      text: "Fair",
    },
    partlycloudy: {
      symbol: "03",
      text: "Partly cloudy",
    },
    cloudy: {
      symbol: "04",
      text: "Cloudy",
    },
    lightrainshowers: {
      symbol: "40",
      text: "Light rain showers",
    },
    rainshowers: {
      symbol: "05",
      text: "Rain showers",
    },
    heavyrainshowers: {
      symbol: "41",
      text: "Heavy rain showers",
    },
    lightrainshowersandthunder: {
      symbol: "24",
      text: "Light rain showers and thunder",
    },
    rainshowersandthunder: {
      symbol: "06",
      text: "Rain showers and thunder",
    },
    heavyrainshowersandthunder: {
      symbol: "25",
      text: "Heavy rain showers and thunder",
    },
    lightsleetshowers: {
      symbol: "42",
      text: "Light sleet showers",
    },
    sleetshowers: {
      symbol: "07",
      text: "Sleet showers",
    },
    heavysleetshowers: {
      symbol: "43",
      text: "Heavy sleet showers",
    },
    lightsleetshowersandthunder: {
      symbol: "26",
      text: "Light sleet showers and thunder",
    },
    sleetshowersandthunder: {
      symbol: "20",
      text: "Sleet showers and thunder",
    },
    heavysleetshowersandthunder: {
      symbol: "27",
      text: "Heavy sleet showers and thunder",
    },
    lightsnowshowers: {
      symbol: "44",
      text: "Light snow showers",
    },
    snowshowers: {
      symbol: "08",
      text: "Snow showers",
    },
    heavysnowshowers: {
      symbol: "45",
      text: "Heavy show showers",
    },
    lightsnowshowersandthunder: {
      symbol: "28",
      text: "Light snow showers and thunder",
    },
    snowshowersandthunder: {
      symbol: "21",
      text: "Snow showers and thunder",
    },
    heavysnowshowersandthunder: {
      symbol: "29",
      text: "Heavy snow showers and thunder",
    },
    lightrain: {
      symbol: "46",
      text: "Light rain",
    },
    rain: {
      symbol: "09",
      text: "Rain",
    },
    heavyrain: {
      symbol: "10",
      text: "Heavy rain",
    },
    lightrainandthunder: {
      symbol: "30",
      text: "Light rain and thunder",
    },
    rainandthunder: {
      symbol: "22",
      text: "Rain and thunder",
    },
    heavyrainandthunder: {
      symbol: "11",
      text: "Heavy rain and thunder",
    },
    lightsleet: {
      symbol: "47",
      text: "Light sleet",
    },
    sleet: {
      symbol: "12",
      text: "Sleet",
    },
    heavysleet: {
      symbol: "48",
      text: "Heavy sleet",
    },
    lightsleetandthunder: {
      symbol: "31",
      text: "Light sleet and thunder",
    },
    sleetandthunder: {
      symbol: "23",
      text: "Sleet and thunder",
    },
    heavysleetandthunder: {
      symbol: "32",
      text: "Heavy sleet and thunder",
    },
    lightsnow: {
      symbol: "49",
      text: "Light snow",
    },
    snow: {
      symbol: "13",
      text: "Snow",
    },
    heavysnow: {
      symbol: "50",
      text: "Heavy snow",
    },
    lightsnowandthunder: {
      symbol: "33",
      text: "Light snow and thunder",
    },
    snowandthunder: {
      symbol: "14",
      text: "Snow and thunder",
    },
    heavysnowandthunder: {
      symbol: "34",
      text: "Heavy snow and thunder",
    },
    fog: {
      symbol: "15",
      text: "Fog",
    },
  };

  getChartOptions() {
    return {
      chart: {
        type: "line",
        renderTo: this.forecast_container,
      },

      credits: false,
      title: null,

      defs: {
        patterns: [
          {
            id: "precipitation-error",
            path: {
              d: [
                "M",
                3.3,
                0,
                "L",
                -6.7,
                10,
                "M",
                6.7,
                0,
                "L",
                -3.3,
                10,
                "M",
                10,
                0,
                "L",
                0,
                10,
                "M",
                13.3,
                0,
                "L",
                3.3,
                10,
                "M",
                16.7,
                0,
                "L",
                6.7,
                10,
              ].join(" "),
              stroke: "#68CFE8",
              strokeWidth: 1,
            },
          },
        ],
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat:
          "<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>" +
          "<b>{point.point.symbolName}</b><br>",
      },
      xAxis: [
        {
          // Bottom X axis
          type: "datetime",
          tickInterval: 2 * 36e5, // two hours
          minorTickInterval: 36e5, // one hour
          tickLength: 0,
          gridLineWidth: 1,
          gridLineColor: "rgba(128, 128, 128, 0.1)",
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30,
          showLastLabel: true,
          labels: {
            format: "{value:%H}",
          },
          crosshair: true,
        },
        {
          // Top X axis
          linkedTo: 0,
          type: "datetime",
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format:
              '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: "left",
            x: 3,
            y: 8,
          },
          opposite: true,
          tickLength: 20,
          gridLineWidth: 1,
        },
      ],
      yAxis: [
        {
          // temperature axis
          title: {
            text: null,
          },
          labels: {
            format: "{value}°",
            style: {
              fontSize: "10px",
            },
            x: -3,
          },
          plotLines: [
            {
              // zero plane
              value: 0,
              color: "#BBBBBB",
              width: 1,
              zIndex: 2,
            },
          ],
          maxPadding: 0.3,
          minRange: 8,
          tickInterval: 1,
          gridLineColor: "rgba(128, 128, 128, 0.1)",
        },
        {
          // precipitation axis
          title: {
            text: null,
          },
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
          tickLength: 0,
          minRange: 10,
          min: 0,
        },
        {
          // Air pressure
          allowDecimals: false,
          title: {
            // Title on top of axis
            text: "hPa",
            offset: 0,
            align: "high",
            rotation: 0,
            style: {
              fontSize: "10px",
              color: Highcharts.getOptions().colors[2],
            },
            textAlign: "left",
            x: 3,
          },
          labels: {
            style: {
              fontSize: "8px",
              color: Highcharts.getOptions().colors[2],
            },
            y: 2,
            x: 3,
          },
          gridLineWidth: 0,
          opposite: true,
          showLastLabel: false,
        },
      ],
      legend: {
        enabled: true,
      },

      plotOptions: {
        series: {
          pointPlacement: "between",
        },
      },
      series: [
        {
          name: "Temperature",
          data: this.temperatures,
          type: "spline",
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">\u25CF</span> ' +
              "{series.name}: <b>{point.y}°C</b><br/>",
          },
          zIndex: 1,
          color: "#FF3333",
          negativeColor: "#48AFE8",
        },

        {
          name: "Precipitation",
          data: this.precipitations,
          type: "column",
          color: "#68CFE8",
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          grouping: false,
          dataLabels: {
            enabled: !this.hasPrecipitationError,
            filter: {
              operator: ">",
              property: "y",
              value: 0,
            },
            style: {
              fontSize: "8px",
              color: "black",
            },
          },
          tooltip: {
            valueSuffix: " mm",
          },
        },
        {
          name: "Air pressure",
          color: Highcharts.getOptions().colors[2],
          data: this.pressures,
          marker: {
            enabled: false,
          },
          shadow: false,
          tooltip: {
            valueSuffix: " hPa",
          },
          dashStyle: "shortdot",
          yAxis: 2,
        },
        {
          name: "Wind",
          type: "windbarb",
          id: "windbarbs",
          color: Highcharts.getOptions().colors[1],
          lineWidth: 1.5,
          data: this.winds,
          vectorLength: 18,
          yOffset: -15,
          tooltip: {
            valueSuffix: " m/s",
          },
        },
      ],
    };
  }

  parseYrData() {
    let pointStart;
    if (!this.json) {
      return this.error();
    }

    this.json.properties.timeseries.forEach((node, i) => {
      const x = Date.parse(node.time);
      const nextHours = node.data.next_1_hours || node.data.next_6_hours;
      const symbolCode = nextHours && nextHours.summary.symbol_code;
      const to = node.data.next_1_hours ? x + 36e5 : x + 6 * 36e5;

      if (to > pointStart + 24 * 2 * 36e5) {
        return;
      }

      this.symbols.push(nextHours.summary.symbol_code);

      this.temperatures.push({
        x,
        y: node.data.instant.details.air_temperature,
        to,
        symbolName:
          Meteogram.dictionary[symbolCode.replace(/_(day|night)$/, "")].text,
      });

      this.precipitations.push({
        x,
        y: nextHours.details.precipitation_amount,
      });

      if (i % 2 === 0) {
        this.winds.push({
          x,
          value: node.data.instant.details.wind_speed,
          direction: node.data.instant.details.wind_from_direction,
        });
      }

      this.pressures.push({
        x,
        y: node.data.instant.details.air_pressure_at_sea_level,
      });

      if (i === 0) {
        pointStart = (x + to) / 2;
      }
    });

    this.createChart();
  }

  createChart() {
    this.chart = new Highcharts.Chart(this.getChartOptions(), (chart) => {
      this.onChartLoad(chart);
    });
  }

  onChartLoad(chart) {
    this.drawWeatherSymbols(chart);
    this.drawBlocksForWindArrows(chart);
  }

  drawWeatherSymbols(chart) {
    chart.series[0].data.forEach((point, i) => {
      if (this.resolution > 36e5 || i % 2 === 0) {
        const [symbol, specifier] = this.symbols[i].split("_");
        const icon =
          Meteogram.dictionary[symbol].symbol +
          ({ day: "d", night: "n" }[specifier] || "");

        if (Meteogram.dictionary[symbol]) {
          chart.renderer
            .image(
              "https://cdn.jsdelivr.net/gh/nrkno/yr-weather-symbols" +
                `@8.0.1/dist/svg/${icon}.svg`,
              point.plotX + chart.plotLeft - 8,
              point.plotY + chart.plotTop - 30,
              30,
              30
            )
            .attr({
              zIndex: 5,
            })
            .add();
        } else {
          console.log(symbol);
        }
      }
    });
  }

  drawBlocksForWindArrows(chart) {
    const xAxis = chart.xAxis[0];

    for (
      let pos = xAxis.min, { max } = xAxis, i = 0;
      pos <= max + 36e5;
      pos += 36e5, i += 1
    ) {
      const isLast = pos === max + 36e5;
      const x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

      const isLong =
        this.resolution > 36e5 ? pos % this.resolution === 0 : i % 2 === 0;

      chart.renderer
        .path([
          "M",
          x,
          chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
          "L",
          x,
          chart.plotTop + chart.plotHeight + 32,
          "Z",
        ])
        .attr({
          stroke: chart.options.chart.plotBorderColor,
          "stroke-width": 1,
        })
        .add();
    }

    chart.get("windbarbs").markerGroup.attr({
      translateX: chart.get("windbarbs").markerGroup.translateX + 8,
    });
  }

  error() {
    console.error("Failed loading data");
  }
}

const WeatherForecast = () => {
  const containerRef = useRef(null);
  const { data } = useContext(DataContext);
  const [weatherData, setWeatherData] = useState({});
  // useEffect(() => {
  //   if (data) {
  //     setWeatherData(data.weather_forecast);
  //     try {
  //       new Meteogram(weatherData, containerRef.current);
  //     } catch (error) {
  //       console.error("Failed loading data:", error);
  //     }
  //   }
  // }, [data, weatherData]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=89.391815&lon=27.07855&altitude=40";
      // "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=50.443530&lon=-4.420760&altitude=25";
      //"http://localhost:4000/date_basedData";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        //const json = (await response.json()).weather_forecast;
        new Meteogram(json, containerRef.current);
      } catch (error) {
        console.error("Failed loading data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Row className="px-2">
      <Card>
        <Row className="card-header align-items-center d-flex p-1">
          <Col>
            <p className="fs-3 fw-semibold">Weather Forecast</p>
          </Col>
        </Row>

        <CardBody>
          <div
            id="forecast_container"
            ref={containerRef}
            style={{ height: "100%", width: "100%" }}
          ></div>
        </CardBody>
      </Card>
    </Row>
  );
};

export default WeatherForecast;
