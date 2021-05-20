import { pluralize, timeConvertor } from "./helpers";
import styles from "../styles/Countdown.module.css";
import { useEffect, useState } from "react";
import { GlitchLetter } from "./GlitchHeader"

/**
 * 
 * @param {string} futureDate in format acceptable in Date object eg. "2021/06/11 17:00"
 * @returns 
 */
export function Countdown({ futureDate }) {
    const getDeltaDate = (fDate) =>
        new Date(fDate).getTime() - new Date().getTime(); // => time diff in ms
    const [deltaDate, setDeltaDate] = useState(getDeltaDate(futureDate)); // set module state
    const {days, hours, minutes, seconds} = timeConvertor(deltaDate); // => {seconds: n, hours: n, ...}
    const digitCouples = [{unit: "day", value: days},{unit: "hour", value: hours},{unit: "minute", value: minutes},{unit: "second", value: seconds}];

    useEffect(() => {
        const tOut = setTimeout(setDeltaDate, 1000, getDeltaDate(futureDate));
        return () => {
            clearTimeout(tOut);
        }
    })

    return (
        <div className={styles["countdown__container"]}>
            {digitCouples.map(couple => (
                            <div key={couple.unit} className={styles["countdown__group"]}>
                            {couple && (
                                <div className={styles["countdown__digit-group"]}>
                                    {couple.value.split("").map((digit, i) => {
                                        return (
                                            <div
                                                key={digit + i}
                                                className={styles["countdown__digit"]}
                                            >
                                                {digit}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <span className={styles["countdown__unit"]}>{" " + pluralize(+couple.value, couple.unit)}</span>
                        </div>
            ))}
        </div>
    );
}
