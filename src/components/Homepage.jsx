import React from "react";
import { useState } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import championNames from "./championNames.json";

const { Title } = Typography;

const Homepage = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [champStats, setChampStats] = useState({});

  const API_KEY = "RGAPI-ed960078-5f6d-4d41-84b1-70e8c208608f";

  function searchForPlayer(event) {
    var APICallSummoner =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;

    axios
      .get(APICallSummoner)
      .then(function (response) {
        setPlayerData(response.data);
        if (response.data) {
          searchPlayerData(response.data.id);
          searchChampion(response.data.id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function searchChampion(id) {
    var API =
      "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
      id +
      "?api_key=" +
      API_KEY;

    axios
      .get(API)
      .then(function (response) {
        setChampStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function searchPlayerData(id) {
    var API =
      "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      id +
      "?api_key=" +
      API_KEY;

    axios
      .get(API)
      .then(function (response) {
        setPlayerStats(response.data[0]);
        console.log(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Total Games Played
  const rank = playerStats.tier + " " + playerStats.rank;
  const total = playerStats.wins + playerStats.losses;

  return (
    <>
      <Title level={2} className='heading'>
        LoLTracker
      </Title>
      <input
        type='text'
        onChange={(e) => setSearchText(e.target.value)}></input>
      <button
        onClick={(e) => {
          searchForPlayer(e);
        }}>
        Search Player
      </button>
      {JSON.stringify(playerData) !== "{}" &&
      JSON.stringify(playerStats) !== "{}" ? (
        <>
          <h1>{playerData.name}</h1>
          <img
            width='100'
            height='100'
            src={
              "http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }></img>
          <p>Summoner Level: {playerData.summonerLevel} </p>
          <Row>
            <Col span={12}>
              <Statistic title='Solo/Duo Games Played' value={total} />
            </Col>
            <Col span={12}>
              <Statistic title='Current Rank' value={rank} />
            </Col>
            <Col span={12}>
              <Statistic title='Solo/Duo Wins' value={playerStats.wins} />
            </Col>
            <Col span={12}>
              <Statistic title='Solo/Duo Losses' value={playerStats.losses} />
            </Col>
          </Row>

          <div className='home-heading-container'>
            <Title level={2} className='home-title'>
              Most Played Champions
            </Title>
          </div>
        </>
      ) : (
        <>
          <h1>There is no data for this player, INACTIVE</h1>
        </>
      )}
    </>
  );
};

export default Homepage;
