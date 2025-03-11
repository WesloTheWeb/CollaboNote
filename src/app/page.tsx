import Image from "next/image";
import styles from "./page.module.scss";
import LaunchStarter from "@/components/LaunchStarter/LaunchStarter";
import ContactCard from "@/components/ContactCard/ContactCard";

export default function Home() {
  return (
    <div>
      <LaunchStarter />
      <ContactCard />
    </div>
  );
}
