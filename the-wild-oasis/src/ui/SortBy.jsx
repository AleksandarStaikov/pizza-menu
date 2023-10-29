import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options, sortName = "sortBy" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortName) || "";

  function handleChange(event) {
    var selectedValue = event.target.value;
    searchParams.set(sortName, selectedValue);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentSort}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
