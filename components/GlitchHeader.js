import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getHex } from "./helpers";
import styles from "../styles/GlitchHeader.module.css";

// idea taken from https://stackoverflow.com/a/3969760/11766092
export function Timer(callback, delay) {
    let timerId, start;

    this.remaining = delay;

    this.pause = () => {
        window.clearTimeout(timerId);
        this.remaining -= Date.now() - start;
    };

    this.resume = () => {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, this.remaining);
    };

    this.resume();
}

export function usePageVisibility() {
    const [hidden, setHidden] = useState(null);
    const [visibilityChange, setVisibilityChange] = useState(null);
    useEffect(() => {
        if (typeof document.hidden !== "undefined") {
            // Opera 12.10 and Firefox 18 and later support
            setHidden("hidden");
            setVisibilityChange("visibilitychange");
        } else if (typeof document.msHidden !== "undefined") {
            setHidden("msHidden");
            setVisibilityChange("msvisibilitychange");
        } else if (typeof document.webkitHidden !== "undefined") {
            setHidden("webkitHidden");
            setVisibilityChange("webkitvisibilitychange");
        }
    }, []);
    return [hidden, visibilityChange];
}

export function GlitchLetter({ children, audioSrc, muted }) {
    const [glitching, setGlitching] = useState(false);
    const [timer, setTimer] = useState(null);
    const [hidden, visibilityChange] = usePageVisibility();
    let letterRef = useRef(null);
    let audioRef = useRef(null);

    // this pauses timeout for the next glitch
    // if user switches to another browser tab
    // and resumes on comeback
    const handleVisibilityChange = (timer) => {
        if (document[hidden]) {
            timer.pause();
        } else {
            timer.resume();
        }
    };

    // this animates(glitch) character and plays audio
    useEffect(() => {
        // prevent glitch of the letter on the first run
        // hidden === null on the first run
        if (!hidden) return;
        // set volume to 20%
        audioRef.volume = 0.2;
        let tl = gsap.timeline().set(letterRef, { color: getHex() });
        tl.from(letterRef, {
            onStart: (audio) => !muted && audio.play(),
            onStartParams: [audioRef],
            scaleY: 0.1,
            scaleX: Math.random() * (20 - 2.5) + 0.5,
            skewX: Math.random() * (180 - 90) + 90,
            duration: 0.2,
        });
        tl.set(letterRef, { scaleY: 1, scaleX: 1, skewX: 0 });
        tl.to(letterRef, {
            color: "inherit",
            onComplete: (audio) => audio.pause(),
            onCompleteParams: [audioRef],
        });
    }, [glitching]);

    // this initialize new timeout for next glitch
    useEffect(() => {
        const glitch = () => setGlitching((glitching) => !glitching);
        const delay = Math.floor(Math.random() * (60 - 15) + 15);
        setTimer(new Timer(glitch, delay * 1000));
    }, [glitching]);

    // this adds/removes listener on visibility change(active browser tab)
    useEffect(() => {
        // set callback reference
        let callback = () => handleVisibilityChange(timer);
        // add listener
        document.addEventListener(visibilityChange, callback, false);
        // remove listener
        return () => {
            document.removeEventListener(visibilityChange, callback, false);
        };
    });

    return (
        <>
            <audio
                ref={(el) => (audioRef = el)}
                muted={muted}
                className={styles["letter-sound"]}
            >
                <source src={audioSrc} type="audio/wav" />
            </audio>
            <span ref={(el) => (letterRef = el)} className={styles.letter}>
                {children}
            </span>
        </>
    );
}

export function Word({ children, className, muted }) {
    return (
        <div className={className}>
            {children.split("").map((char, i, word) => {
                let audioNum = Math.floor(Math.random() * 7 + 1);
                let audioSrc = `/audio/glitch-noise-${audioNum}.wav`;
                return (
                    <GlitchLetter
                        key={word.join("") + i}
                        audioSrc={audioSrc}
                        muted={muted}
                    >
                        {char}
                    </GlitchLetter>
                );
            })}
        </div>
    );
}

export function GlitchHeader({ children, muted, setMuted }) {
    return (
        <>
            <button
                className={styles["audio-toggle-btn"]}
                onClick={() => setMuted(muted => !muted)}
            >
                {muted ? (
                    <i className="fas fa-volume-mute" title="Unmute"></i>
                ) : (
                    <i className="fas fa-volume-up" title="Mute"></i>
                )}
            </button>
            <div className={styles.title} role="heading" aria-level="1">
                {children
                    .toUpperCase()
                    .split(" ")
                    .map((word, i) => (
                        <Word key={i} className={styles.word} muted={muted}>
                            {word}
                        </Word>
                    ))}
            </div>
        </>
    );
}
