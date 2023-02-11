# Project structure

_**src**_ - source code structure folder

- **config** - contain config file for firebase services
- **controllers** - contain controller of express app
- **helpers** - contain helper need for data process
- **routers** - contain routes of express app
- **services** - contain service to handle api
- **twilio** - contain service of Twilio

_**Before run the server please install package with npm i and add to .env file to the root level below variables**_

```bash
PORT=3001
TWILIO_ACCOUNT_ID=ACc1c1b5bcd3596df5fd128cb030f0f422
TWILIO_AUTH_TOKEN=f9cd1352eb759ec3209a6f54b2069a55
```

Run the Application

```bash
npm run dev
```
