const axios = require('axios').default;

class WixInboxApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
    }

    async sendMessage(instanceId, message) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return await axios.post(`${this.baseUrl}/messages`, message,  {headers: {authorization: accessToken}}).then(r => r.data);
    }

    async getConversation(instanceId, participantId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        const data = {"participantId": participantId}
        return await axios.post(`${this.baseUrl}/conversations`,data ,  {headers: {authorization: accessToken}}).then(r => r.data);
    }


}

module.exports = {
    WixInboxApis
}
