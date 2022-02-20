import React from "react";
import { useState } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { leagueCards } from "../components";
import championNames from "./championNames.json";

const { Title } = Typography;

const Homepage = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [champStats, setChampStats] = useState({});

  const API_KEY = "RGAPI-30c0e749-44a0-46b9-b8f4-5108697bee46";

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
          Rend();
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
        setPlayerStats(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function Rend() {
    const cham = [];
    console.log(championNames[champStats[0].championId]);
    for (var i = 0; i < championNames.length; i++) {
      cham.push(championNames[champStats[i].championId]);
    }

    return <>{cham}</>;
  }

  // Total Games Played
  const total = playerStats.wins + playerStats.losses;
  const rank = playerStats.tier + " " + playerStats.rank;

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
      {JSON.stringify(playerData) != "{}" &&
      JSON.stringify(playerStats) != "{}" ? (
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

          <Rend />
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
