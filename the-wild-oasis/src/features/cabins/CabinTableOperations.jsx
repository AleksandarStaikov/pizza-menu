import TableOperatoins from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const sortOptions = [
  {
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    value: "regularPrice-asc",
    label: "Sort by  price (low first)",
  },
  {
    value: "regularPrice-desc",
    label: "Sort by price (high first)",
  },
  {
    value: "maxCapacity-asc",
    label: "Sort by capacity (low first)",
  },
  {
    value: "maxCapacity-desc",
    label: "Sort by capacity (high first)",
  },
];

function CabinTableOperations() {
  return (
    <TableOperatoins>
      <Filter filterName="discount">
        <Filter.Button default value="all">
          All
        </Filter.Button>
        <Filter.Button value="no-discount">No discount</Filter.Button>
        <Filter.Button value="with-discount">With discount</Filter.Button>
      </Filter>

      <SortBy options={sortOptions}></SortBy>
    </TableOperatoins>
  );
}

export default CabinTableOperations;
