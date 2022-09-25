import React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

const MAP_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function Sidebar(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  return (
    <div className="sidebar">
      <header className="sticky top-0 bg-gray-50 z-50 px-10 py-5">
        <div className="search pt-2 mx-auto text-gray-600 relative">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <button
            type="submit"
            className="absolute right-4 top-4"
            onClick={() => {
              const params = {
                q: searchText,
                format: "json",
                addressDetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${MAP_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err", err));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </header>

      <List component="nav" aria-label="main mailbox-folders">
        {listPlace.map((item) => {
          return (
            <div key={item?.osm_id}>
              <ListItem
                button
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <ListItemIcon>
                  <img
                    src="./../marker.png"
                    alt="map"
                    style={{ width: 38, height: 38 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item?.display_name}></ListItemText>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
}
