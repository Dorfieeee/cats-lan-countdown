import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GlitchHeader } from "../components/GlitchHeader";
import { Countdown } from "../components/Countdown";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>CATS - LAN Praslavice 2021</title>
                <meta
                    name="description"
                    content="Webpage about CATS clan's LAN-party in Praslavice in June, 2021."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles["top-section"]}>
                <header className={styles["top-header"]}>
                    <GlitchHeader className={styles.title}>
                        LAN Praslavice 6/2021
                    </GlitchHeader>
                </header>

                <div className={styles["members-video-wrapper"]}>
                    <video
                    className={styles["members-video"]}
                    src="/img/cats-lanka-short.webm"
                    width="100%"
                    height="auto"
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    />
                </div>
                <Countdown futureDate={"2021/06/11 17:00"}/>
            </section>

            {/* <main className="main-container">
                <section className="main-section">
                    <h2>Timeline</h2>
                </section>
                <section className="main-section">
                    <h2>Participants</h2>
                </section>
                <section className="main-section">
                    <h2>Map</h2>
                </section>
            </main> */}
        </div>
    );
}
