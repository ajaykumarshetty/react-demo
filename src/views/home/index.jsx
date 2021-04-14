import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

import { getData, getService } from "../../redux/getListData/listDataAction";
import { addMonths , formatDate } from "../../utils/commonMethod"
import "../../assets/css/home.css";


const start = addMonths(new Date(), -2).toString();
const end = new Date();

const daysBetween =
  (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 3600 * 24);
const arr = [];
const dateFormat = { weekday: "long", month: "short", day: "numeric" };

for (let i = 0; i <= daysBetween; i += 1) {
  if (i === 0 || i % 15 === 0 || i === 59) {
    const temp = new Date();
    temp.setDate(new Date(start).getDate() - i);
    const [, dateStr] = temp
      .toLocaleDateString("en-US", dateFormat)
      .split(", ");
    arr.push(dateStr);
  }
}

const mockData = {
  labels: arr.reverse(),
  options : {
    legend: {
      display: false
  }
  },
  datasets: [
    {
      label: "Last 60 Days trend",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
};

const Home = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [initialGraphData, setInitialGraphData] = useState(mockData);
  const [isGraphDataLoading, setIsGraphDataLoading] = useState(false);

  const { countryData: { bpi } = {}, getData } = props;

  useEffect(() => {
    getData({
      api: "currentprice.json",
      listKey: "countryData",
      loadingKey: "isCountryDataLoading",
    });
  }, [getData]);

  useEffect(() => {
    getGraphData(selectedCountry);
  }, []);

  const countryChage = (e) => {
    setSelectedCountry(e.target.value);
    getCountryCurrency();
    getGraphData(e.target.value);
  };

  const getGraphData = (value) => {
    setIsGraphDataLoading(true)
    getService(
      `historical/close.json?currency=${value}&start=${formatDate(start)}&end=${formatDate(end)}`
    )
      .then((res) => {
        let currencyData = [];
        res.data.bpi &&
          Object.values(res.data.bpi).map((value) => currencyData.push(value));
        initialGraphData.datasets[0].data = currencyData;
        setInitialGraphData({ ...initialGraphData });
        setIsGraphDataLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setIsGraphDataLoading(false)
      });
  };

  const getCountryCurrency = () => {
    return (
      <>
        {bpi && (
          <h1>
            {bpi[selectedCountry].rate_float} {bpi[selectedCountry].description}
          </h1>
        )}
      </>
    );
  };

  return (
    <div className="home">
      <div className="home-align-items">
        <div>
          <p className="text-gray">One bitcoin Equals</p>
          <select onChange={countryChage} value={selectedCountry}>
            {bpi &&
              Object.keys(bpi).map((key, index) => (
                <option key={bpi[key].code + index} value={bpi[key].code}>{bpi[key].description}</option>
              ))}
          </select>
          {getCountryCurrency()}
        </div>
        <div>
          {isGraphDataLoading ? (
            <div className="loading"> Loading </div>
          ) : (
            <Line
              data={initialGraphData}
              width={500}
              height={400}
              options={{ maintainAspectRatio: false, responsive: false }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countryData: state.listDataReducer.countryData,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getData: (data) => dispatch(getData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Home);
