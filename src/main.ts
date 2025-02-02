import {inRange} from "range_check";

const CURRENT_URL = new URL('.', import.meta.url).href;

console.log("Current URL", CURRENT_URL);

let IP_ENDPOINT = "https://api.ipify.org";
//let IP_ENDPOINT = "https://api64.ipify.org";
let RANGES_ENDPOINT=CURRENT_URL + 'res/starlink_ranges.json';
let BANNER_ID="starlink-banner";
let CLOSED_BANNER_KEY="starlink-banner-closed";
let MUSK_NAZI_URL="https://banmusk.net/elon-musk-is-a-nazi"

let CONTENT = `
        <style>
            #${BANNER_ID} {
                background-color: black;
                color:white !important;
                padding: 1em;
                align-content: center;
                text-align: center;
                border: 5px solid red;
                position:absolute;
                z-index: 30000;
                width: 100%;
            }
            #musk-salute {
                width: 150px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            #${BANNER_ID} a:link, a:visited, a:hover, a:active {
                color: lightgray;
            }

        </style>
       <img id="musk-salute" src="${CURRENT_URL}res/musk.png" alt="Elon Musk doing the nazi salute."/>
       
        <p>
            Hi, it seems you are using <b>Starlink</b> to access internet.
        </p>
        <p>
            Starlink belongs to <b>Elon Musk</b>, who is <a href="${MUSK_NAZI_URL}">openly a neo nazi</a>.<br/> 
            Please consider other, <a href="https://www.google.com/search?q=+alternative+starlink">non-neonazi, alternatives.</a>  
        </p>
        
        <button id="starlink-close-button">Yeah, I know 😞</button>
`;

async function get_ranges() {
    const res = await fetch(RANGES_ENDPOINT);
    return res.json();
}

async function fetch_ip() {
    const response = await fetch(IP_ENDPOINT);
    let ip = await response.text();
    console.log('ip', ip);
    return ip;
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

function close(){
    document.getElementById(BANNER_ID).style.visibility = 'hidden';
    localStorage.setItem(CLOSED_BANNER_KEY, "true");
}

async function main() {

    if (localStorage.getItem(CLOSED_BANNER_KEY)) {
        return;
    }

    let is_starlink = await check_starlink();

    console.log("Starlink ?", is_starlink);

    if (is_starlink) {
        const div = document.createElement('div');
        div.setAttribute("id", BANNER_ID)

        div.innerHTML = CONTENT;
        document.documentElement.insertBefore(div, document.documentElement.firstChild);

        // Add event listener
        const button = document.getElementById('starlink-close-button');
        button.addEventListener('click', close)
    }
}


window.addEventListener('load', async () => {
    await main();
});

