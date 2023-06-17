import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { google_API } from './google_credentials';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export function AddressAutocomplete() {
    <GooglePlacesAutocomplete
        placeholder="Enter address"
        onPress={(data, details = null) => {
            // Handle selected address
            console.log(data);
        }}
        query={{
            key: google_API,
            language: 'en', // Specify the language
            types: '(cities)', // Limit results to cities
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
    />
};
