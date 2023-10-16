import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { useAuthContext } from "../contexts/FakeAuthContext";
import User from "../components/User";

function AppLayout() {
  const { user } = useAuthContext();

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
