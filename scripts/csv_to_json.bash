#!/usr/bin/bash

ISP_URL="https://geoip.starlinkisp.net/feed.csv"
OUT="src/static/starlink_ranges.json"

curl $ISP_URL | awk -F"," -f ./scripts/csv_json.awk > $OUT