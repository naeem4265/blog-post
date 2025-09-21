#!/usr/bin/env python3
import json, os, sys
from datetime import datetime
from urllib.parse import urlencode
from urllib.request import urlopen
import logging

API = "https://api.openweathermap.org/data/2.5/weather"
HOT, COLD = 35.0, 5.0
LOG = "weather_alert.log"

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG, encoding='utf-8'),
        logging.StreamHandler()
    ]
)

def load_dotenv_simple(path):
    if not os.path.exists(path): return
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line: continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

def main():
    # load ../.env if present (adjust if your .env lives elsewhere)
    load_dotenv_simple(os.path.join(os.path.dirname(__file__), "..", ".env"))

    city = " ".join(sys.argv[1:]) or os.getenv("DEFAULT_CITY", "Dhaka")
    key = os.getenv("OWM_API_KEY")
    if not key:
        logging.error("OWM_API_KEY not found in environment variables or .env file")
        return 2

    url = f"{API}?{urlencode({'q': city, 'appid': key, 'units': 'metric'})}"
    logging.info(f"Making request to: {url.replace(key, '[REDACTED]')}")
    
    try:
        with urlopen(url, timeout=10) as r:
            data = json.loads(r.read().decode())
        if data.get("cod") != 200:
            logging.error(f"API error: {data.get('message', 'unknown')}")
            return 1

        temp = float(data["main"]["temp"])
        name = f"{data.get('name','')}, {data.get('sys',{}).get('country','')}".strip(", ")
        desc = (data.get("weather") or [{}])[0].get("description", "").title()
        logging.info(f"{name}: {temp:.1f}°C, {desc}")

        alert = None
        if temp > HOT:  
            alert = f"HOT ALERT: {name} {temp:.1f}°C > {HOT:.1f}°C"
            logging.warning(alert)
        elif temp < COLD:
            alert = f"COLD ALERT: {name} {temp:.1f}°C < {COLD:.1f}°C"
            logging.warning(alert)
            
        return 0
        
    except Exception as e:
        logging.error(f"Error: {str(e)}", exc_info=True)
        return 1

if __name__ == "__main__":
    sys.exit(main())
