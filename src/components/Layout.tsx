import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { styles } from "../utils/styles";

export function Layout() {
  return (
    <div style={styles.app}>
      <Navigation />
      <div style={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}
