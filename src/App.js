import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Card, Table } from "./component";
import image from "./images/covid.png";
import pankaj from "./images/pankaj.jpg";
{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
function App() {
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const [totalIndiaCase, setTotalIndiaCase] = useState([]);
  const [totalStateWiseCount, setTotalStateWiseCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalStateArrayLength, setTotalStateArrayLength] = useState("");
  let [filteredData] = useState();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const resp = await axios.get("https://data.covid19india.org/data.json");
    // const x=resp.json();
    // console.log(resp.data.Bihar.districtData.Arwal.confirmed);
    setTotalIndiaCase(resp.data.statewise.slice(0, 1));
    const totalStateCount = resp.data.statewise.slice(1);
    setTotalStateWiseCount(totalStateCount);
    setTotalStateArrayLength(totalStateCount.length);
    setLoading(false);
  };

  const stateSearch = (searchText) => {
    filteredData = totalStateWiseCount.filter((value) => {
      return value.state.toLowerCase().includes(searchText.toLowerCase());
    });
    setTotalStateWiseCount(filteredData);
  };
  return (
    <div className="App">
      <span>
        <img style={{height: "70px" }} src={image} alt="COVID-19" />{" "}
        <h1><i>Covid Tracker</i></h1>
      </span>
      <h4>As of {date}</h4>
      <Card totalIndiaCase={totalIndiaCase} />
      <Table
        totalStateWiseCount={totalStateWiseCount}
        loading={loading}
        totalStateArrayLength={totalStateArrayLength}
        loadData={loadData}
        stateSearch={stateSearch}
        filteredData={filteredData}
      />



<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Covid<span> Tracker</span></h3>

				<p class="footer-links">
					<a href="#">Home   |    </a>
					
					<a href="#">About</a>
					
				</p>

				<p class="footer-company-name">Pankaj All rights reserved @ 2020-2024 </p>

				<div class="footer-icons">

                        <a href="https://twitter.com/PnkajGupta1" target="_blank"><i class="fab fa-twitter-square"></i></a>
                        <a href="https://www.instagram.com/pankajgupta_25/" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/pankajgupta2025/" target="_blank"><i class="fab fa-linkedin"></i></a>
			<a href="https://github.com/Me-Pankaj" target="_blank"><i class="fab fa-github"></i></a>

				</div>

			</div>

			<div class="footer-right">

				<p>Contact Me</p>

				<form action="https://formspree.io/f/mnqlgeag" method="post">

					<input type="text" name="email" placeholder="Email"/>
					<textarea name="message" placeholder="Message"></textarea>
          
          <div class="submit">
                <input type="submit" value="Submit Now" placeholder="Submit"/>
                <input type="reset" value="Reset Now" name="reset" placeholder="clear"/>
            </div>
          


          </form>


			</div>

		</footer>
      
    </div>

      

  );
}

export default App;
