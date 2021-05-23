import React from "react";

import AppLayout from "./AppLayout";
import WeatherSearch from "./WeatherSearch";

import * as recommendations from "../recommendations";

export default function Weather(props) {
  const { city, currentWeather, forecast, onCityChange, error, iconProvider } = props;
  if (currentWeather && forecast) {
    const icon = iconProvider(currentWeather.icon_id);
    const recommendation =
      recommendations.default[currentWeather.icon_id].recommendation;

    return (
      <div>
        <WeatherSearch city={city} onCityChange={onCityChange} error={error} />
        <AppLayout
          currentWeather={currentWeather}
          forecast={forecast}
          icon={icon}
          recommendation={recommendation}
        />
      </div>
    );
  }
}
