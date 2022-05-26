import BillingSummaryCard from "../components/BillingSummaryCard";
import ClientDetailsCard from "../components/ClientDetailsCard";
import FakeAuthorization from "../components/FakeAuthorization";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <FakeAuthorization />
      <ClientDetailsCard />
      <BillingSummaryCard />
    </div>
  );
}
