const baseURL = 'https://twende-server.vercel.app';
const locationsUrl  = `${baseURL}/api/locations`;

export const fetchLocationData = async () => {
    const response = await fetch(locationsUrl);

    try {
    if (!response.ok) {
        throw new Error(`Response Status: ${response?.error}`)
    };

    const allLocationsJson = response.json();
    console.log(allLocationsJson);

    return allLocationsJson;
    } catch(error) {
        console.error('Error fetching location data: ', error);
        throw new Error(`Error fetching locations: ${error}`);
    };
}