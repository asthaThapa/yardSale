import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { google_API} from './google_credentials';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';



async function addressToCoordinates(address) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${google_API}`;
  
    try {
      const response = await axios.get(geocodeUrl);
      const { status, results } = response.data;
  
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Unable to convert address to coordinates');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while converting address to coordinates');
    }
  }
  
  export async function convertAddressesToCoordinates(addresses) {
    const permissions = await Location.requestForegroundPermissionsAsync();
  
    if (permissions.status !== 'granted') {
      throw new Error('Location permission not granted');
    }
  
    const coordinates = [];
  
    for (const address of addresses) {
      try {
        const location = await Location.geocodeAsync(address);
        const [result] = location;
  
        if (result) {
          coordinates.push(result);
        } else {
          const { latitude, longitude } = await addressToCoordinates(address);
          coordinates.push({ latitude, longitude });
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    return coordinates;
  }


export function AddressAutocomplete () {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // Handle the selected place data
            console.log(data, details);
          }}
          query={{
            key: google_API,
            language: 'en', // Change the language as per your preference
          }}
        />
      </View>
    );
  };
  