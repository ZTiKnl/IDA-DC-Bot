# IDA-DC-Bot
Send a Distress Call to Discord Channel when called upon

## Version  
Version 0.10  

## What it does:  
Whenever a user is interdicted, an event is created in the ED journal file.  
The [IDA-Distress Call](https://github.com/ZTiKnl/IDA-Distress-Call) EDMC plugin reads this event (Interdicted), gathers data, and pushes JSON formatted data to the IDA-DC-Bot.  
Data sent to the IDA-DC-Bot is processed and posted on a dedicated Discord channel.  

## How to use:  
1. Clone the repo, or download and unzip to to a prefered location  
   (example: `/home/ztiknl/IDA-DC-Bot/`)  
2. Add nginx/apache redirect requests for /api to port 3001
3. Install Node.js and NPM
4. Create a system service that runs `node /locationtofile/`  

## Disclaimer
This plugin is still under construction, ~~bugs~~ new features WILL appear unexpectedly.  
There is no license on this code, feel free to use it as you see fit.  
Patches are always welcome.  

## Thanks
- devnull & Plusran, wouldnt have gotten this bot working so fast without your help  
- Riddled for the suggestion to make this
