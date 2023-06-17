import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { google_API } from './google_credentials';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useEffect, useRef, useState } from "react";


export function AddressAutocomplete() {
    const [address, setAddress] = useState('');

    const handleAddressSelect = (data, details) => {
        // Get the selected address details
        const { formatted_address, geometry } = details;
        const { location } = geometry;
    
        // Set the selected address in the state
        setAddress(formatted_address);
    
        // Use the location coordinates if needed
        const { lat, lng } = location;
        console.log('Selected Location:', lat, lng);
      };
    <View>
        <GooglePlacesAutocomplete
            placeholder="Enter address"
            onPress={handleAddressSelect}
            query={{
                key: google_API,
                language: 'en', // Set desired language
            }}
            styles={{
                container: {
                    flex: 1,
                },
                textInputContainer: {
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    marginHorizontal: 16,
                    marginTop: 8,
                    marginBottom: 16,
                },
                textInput: {
                    height: 40,
                    marginLeft: 8,
                    marginRight: 0,
                    color: '#5d5d5d',
                },
            }}
        />
        <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Selected Address"
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginHorizontal: 16,
                height: 40,
                paddingHorizontal: 8,
            }}
        />
    </View>
};
