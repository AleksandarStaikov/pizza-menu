import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  const distinctCountries = cities.reduce((acc, city) => {
    if (acc.some((x) => x.country === city.country)) return acc;

    return [...acc, { country: city.country, emoji: city.emoji }];
  }, []);

  if (isLoading) return <Spinner />;

  if (!distinctCountries.length)
    return (
      <Message message="Add your first country by clicking on a city on the map!" />
    );

  return (
    <ul className={styles.cityList}>
      {distinctCountries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
