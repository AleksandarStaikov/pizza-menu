import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          src={`https://flagcdn.com/w40/${country.emoji}.png`}
          alt={country.country}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
