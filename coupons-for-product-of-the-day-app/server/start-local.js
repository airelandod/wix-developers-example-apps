require('dotenv').config();
const localtunnel = require('localtunnel');
const {startServer} = require('./src/app');

(async () => {
    const {APP_ID, APP_SECRET, WEBHOOK_PUBLIC_KEY} = process.env;
    const baseUrl = `https://${process.env.APP_ID}.loca.lt`;
    const appUrl = `${baseUrl}/auth/app-wix`
    const redirectUrl = `${baseUrl}/auth/redirect-wix`;
    const installedWebhook = `${baseUrl}/webhooks/app-installed`;
    const removedWebhook = `${baseUrl}/webhooks/app-removed`;
    const purchasedWebhook = `${baseUrl}/webhooks/plan-purchased`;
    const wixBaseUrl = 'https://www.wix.com';
    const config = {APP_ID, APP_SECRET, port: 8080, appUrl, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY};
    await localtunnel({port: config.port, subdomain: process.env.APP_ID});
    console.log(`Local server running on port 8080
AppUrl: ${appUrl}   
RedirectUrl: ${redirectUrl}    
App Installed webhook: ${installedWebhook}
App removed webhook: ${removedWebhook}
App upgraded webhook: ${purchasedWebhook}
`)

    const app = startServer(config)
    app.listen(config.port);
})();