document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const city = document.getElementById('city-input').value.trim();
    const apiKey = 'da920e308f5aaa054071b2cee005f932'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        
        // Check if the response is not OK (e.g., 404 or 500 errors)
        if (!response.ok) {
            throw new Error('City not found or API request failed');
        }
        
        const data = await response.json();

        // Check if the response contains weather data
        if (data.cod !== 200) {
            throw new Error(data.message || 'Error fetching weather data');
        }

        const weatherInfo = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
    }
});
