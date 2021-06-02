import {useState, useEffect} from 'react'

export const useGooglesheetFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("something went wrong");
                }
                const csv = await res.text();
                const rows = csv.split(/\r\n/).map((row) => row.split(","));

                const header = rows.shift();

                return rows.filter(row => row[0]).map((row) => {
                    return header.reduce((obj, propName, i) => {
                        obj[propName] = row[i] ?? "";
                        return obj;
                    }, {});
                });
            } catch (error) {
                console.log(error);
            }
        };

        getData().then(d => setData(d))

    }, []);

    return data;
};