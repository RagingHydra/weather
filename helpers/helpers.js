const axios = require("axios");

module.exports = {
	/** @param {String} url  */
	async getExternal(url) {
		return await axios.get(url);
	},

	/** @param {Number} lat
	 * @param {Number} lon  */
	composeWeatherURL(lat, lon) {
		return __config.openweathermapAPIURL + `?lat=${lat}&lon=${lon}&appid=${__config.openweathermapAPIKey}`
	},

	generateTestData() {
		return {
			current: {
				temp: Math.random() * 50 - 10 //Random temperature from -10 to 40
			}
		}
	}
}
