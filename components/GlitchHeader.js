import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getHex } from "./helpers";
import styles from "../styles/GlitchHeader.module.css"

export function GlitchLetter({ children, isBoringFont, audioSrc }) {
    const [glitching, setGlitching] = useState(true);
    const [muted, setMuted] = useState(true);
    let letterRef = useRef(null);
    let audioRef = useRef(null);

    // Animate character
    useEffect(() => {
        if (glitching) {
            let tl = gsap.timeline().set(letterRef, { color: getHex() });
            tl.from(letterRef, {
                scaleY: 0.1,
                scaleX: Math.random() * (20 - 2.5) + 0.5,
                skewX: Math.random() * (180 - 90) + 90,
                duration: 0.05,
            });
            tl.set(letterRef, { scaleY: 1, scaleX: 1, skewX: 0 });
            tl.to(letterRef, { color: "inherit" });
        }
    });

    // Play audio
    useEffect(() => {
        if (!muted) {
            audioRef.play();
        }
    });

    useEffect(() => {
        const glitch = () => setGlitching(!glitching);
        const delay = Math.random() * (20 - 3) + 3;
        setTimeout(glitch, delay * 1000);
    });

    return (
        <>
            <audio
                ref={(el) => (audioRef = el)}
                muted={muted}
                className={styles["letter-sound"]}
            >
                <source src={audioSrc} type="audio/mpeg" />
            </audio>
            <span
                ref={(el) => (letterRef = el)}
                className={styles.letter}
            >
                {children}
            </span>
        </>
    );
}

export function Word({ children, ...props }) {
    return (
        <div {...props}>
            {children.split("").map((char, i, word) => {
                let isBoringFont = Math.round(Math.random());
                let audioNum = Math.floor(Math.random() * (6 - 1) + 1);
                let audioSrc = `/audio/short-${audioNum}.mp3`;
                return (
                    <GlitchLetter
                        key={i}
                        isBoringFont={isBoringFont}
                        audioSrc={audioSrc}
                    >
                        {char}
                    </GlitchLetter>
                );
            })}
        </div>
    );
}

export function GlitchHeader({ children, ...props }) {
    return (
        <h1 className={styles.title}>
            {children
                .toUpperCase()
                .split(" ")
                .map((word, i) => (
                    <Word key={i} className={styles.word}>
                        {word}
                    </Word>
                ))}
        </h1>
    );
}
