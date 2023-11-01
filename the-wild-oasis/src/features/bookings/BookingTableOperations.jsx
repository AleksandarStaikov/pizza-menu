import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterName="status">
        <Filter.Button default value="all">
          All
        </Filter.Button>
        <Filter.Button value="checked-out">Checked out</Filter.Button>
        <Filter.Button value="checked-in">Checked in</Filter.Button>
        <Filter.Button value="unconfirmed">Unconfirmed</Filter.Button>
      </Filter>

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
