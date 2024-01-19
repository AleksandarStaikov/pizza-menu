import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter filterName="last">
      <Filter.Button value="7">Last 7 days</Filter.Button>
      <Filter.Button value="30">Last 30 days</Filter.Button>
      <Filter.Button value="90">Last 90 days</Filter.Button>
    </Filter>
  );
}

export default DashboardFilter;
