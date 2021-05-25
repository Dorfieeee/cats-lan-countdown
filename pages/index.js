import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GlitchHeader } from "../components/GlitchHeader";
import { Countdown } from "../components/Countdown";
import { useState } from "react";

export default function Home() {
    const [muted, setMuted] = useState(true);

    return (
        <div className={styles.container}>
            <Head>
                <title>CATS - LAN Praslavice 2021</title>
                <meta
                    name="description"
                    content="Webpage about CATS clan's LAN-party in Praslavice in June, 2021."
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
                    integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
                    crossorigin="anonymous"
                ></link>
            </Head>

            <section className={styles["top-section"]}>
                <h2 className={styles["off-screen"]}>Countdown</h2>
                <header className={styles["top-header"]}>
                    <a
                        className={styles.logo}
                        href="https://csb-9mk2e.netlify.app/"
                        target="_blank"
                    >
                        <img
                            src="https://i.ibb.co/7pw2wXF/CATS-weblogo.png"
                            width="50"
                            height="58"
                            alt="Clan logo of CATS"
                        ></img>
                    </a>
                    <GlitchHeader
                        className={styles.title}
                        muted={muted}
                        setMuted={setMuted}
                    >
                        LAN Praslavice 6/2021
                    </GlitchHeader>
                </header>

                <div className={styles["members-video-wrapper"]}>
                    <video
                        className={styles["members-video"]}
                        src="/img/cats-lanka-short.webm"
                        width="756"
                        height="371"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    />
                </div>
                <Countdown futureDate={"2021/06/11 17:00"} />
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
