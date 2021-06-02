import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GlitchHeader } from "../components/GlitchHeader";
import Carousel from "../components/carousel-static";
import { Countdown } from "../components/Countdown";
import { useState } from "react";
import { useGooglesheetFetch } from "../hooks/customHooks";
import Image from "next/image";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e" +
    "/2PACX-1vTwVnwz39nfntGhJ5QNGI6uge6Shb5LhHuLwIrNUSOycPYYfkhd_5yoOpLrDAq6IP1pHRppgMY_z5T5" +
    "/pub?gid=672451712&single=true&output=csv";

export default function Home() {
    const [muted, setMuted] = useState(true);
    const members = useGooglesheetFetch(sheetURL);

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
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Hacked/Hacked-KerX.ttf"
                    as="font"
                    crossOrigin=""
                />
            </Head>

            <section className={styles["top-section"]}>
                <h2 className={styles["off-screen"]}>Countdown</h2>
                <header className={styles["top-header"]}>
                    <a
                        className={styles.logo}
                        href="https://csb-9mk2e.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src="/img/cats-logo.png"
                            width={50}
                            height={58}
                            alt="Clan logo of CATS"
                        />
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
                        width="756"
                        height="371"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    >
                        <source
                            src="/video/cats-lanka-short.webm"
                            type="video/webm"
                        />
                        <source
                            src="/video/cats-lanka-short.mp4"
                            type="video/mpeg"
                        />
                        {
                            "This browser does not support the HTML5 video element."
                        }
                    </video>
                </div>
                <Countdown futureDate={"2021/06/11 17:00"} />
            </section>

            <section className={styles["main-section"]}>
                <h2>Participants</h2>
                <Carousel items={members} />
            </section>

            {/* <main className="main-container">
                <section className="main-section">
                    <h2>Timeline</h2>
                </section>
                <section className="main-section">
                    <h2>Map</h2>
                </section>
            </main> */}
        </div>
    );
}
