import {inRange} from "range_check";

const CURRENT_URL = new URL(import.meta.url);

let IP_ENDPOINT = "https://api.ipify.org";
let RANGES_ENDPOINT=new URL('./static/starlink_ranges.json', CURRENT_URL);
let CONTENT = `
        <h1>You are connected with Starlink</h1>
`;

async function get_ranges() {
    const res = await fetch(RANGES_ENDPOINT.href);
    return res.json();
}

async function fetch_ip() {
    const response = await fetch(IP_ENDPOINT);
    return await response.text();
}

async function check_starlink() {

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('starlink')) {
        return true;
    }

    let ip = await fetch_ip();
    let ranges = await get_ranges();

    console.log(`Ip : ${ip}; ranges : ${ranges}`);

    for (let range of ranges) {
        if (inRange(ip, range)) {
            return true;
        }
    }
    return false;
}

async function main() {

    let is_starlink = await check_starlink();

    console.log("Starlink ?", is_starlink);

    if (is_starlink) {
        const div = document.createElement('div');
        div.setAttribute("class", "starlink-banner")

        div.innerHTML = CONTENT;
        document.documentElement.insertBefore(div, document.documentElement.firstChild);
    }
}


window.addEventListener('load', async () => {
    await main();
});