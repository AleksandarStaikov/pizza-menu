import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resourceName="cabins" />;

  const filter = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy");

  let filteredCabins = cabins;

  if (filter === "no-discount")
    filteredCabins = cabins.filter((cabin) => !cabin.discount);

  if (filter === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount);

  let sortedCabins = filteredCabins;
  if (sortBy) {
    const [sortName, sortDirection] = sortBy.split("-");
    const modifier = sortDirection === "asc" ? 1 : -1;
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[sortName] > b[sortName] ? 1 : -1) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
