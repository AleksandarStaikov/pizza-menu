import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const ENDPOINT = "https://api.bigdatacloud.net/data/reverse-geocode-client/";

function Form() {
  const navigate = useNavigate();
  const { addCity, isLoading } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(true);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!mapLat || !mapLng) {
      setGeoError("Please select a location on the map!");
      return;
    }

    async function fetchCityData() {
      try {
        setGeoError(null);
        setIsLoadingGeoLocation(true);
        var response = await fetch(
          `${ENDPOINT}?latitude=${mapLat}&longitude=${mapLng}`
        );
        var data = await response.json();

        if (!data.countryCode) {
          throw new Error(
            "Seems like you did not select a valid location, please try again!"
          );
        }

        setCountryCode(data.countryCode.toLocaleLowerCase());
        setCountryName(data.countryName);
        setCityName(data.city || data.locality || "");
      } catch (error) {
        setGeoError(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }

    fetchCityData();
  }, [mapLat, mapLng]);

  function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country: countryName,
      emoji: countryCode,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    addCity(newCity, () => navigate(`/app/cities`));
  }

  if (geoError) return <Message message={geoError} />;

  if (isLoadingGeoLocation) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            alt={countryCode}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker selected={date} onChange={setDate} id="date" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
