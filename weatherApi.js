const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const appid = '&appid=3370fb0dc106a2e8ba68c9d1a698d8c5'

export const fetchWeather = (lat, lon) => {
	const url = rootUrl+'lat='+lat+"&lon="+lon+"&units=metric"+appid
	console.log(url)

	return fetch(url)
		.then(res => res.json())
		.then(json => ({
			temp: json.main.temp,
			weather: json.weather[0].main
		}))
} 

