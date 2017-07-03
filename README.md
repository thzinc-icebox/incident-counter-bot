# Incident counter bot

To get started:

```bash
npm install
npm run init
# follow instructions to log in to Auth0 Webtask
npm run publish # Deploy the webhook
# Copy for the URL after "You can access your webtask at the following url:"
```

Set up a new [outgoing webhook](https://nextexponent.slack.com/apps/A0F7VRG6Q-outgoing-webhooks) in Slack.

* Choose a trigger word like `incident bot`
* Paste the URL from the publish command above
* Customize as you see fit

In Slack, you can trigger the bot like so:

`incident bot, reset`

`incident bot, set last incident to last Monday`

`incident bot, how long has it been?`