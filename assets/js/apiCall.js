import {apiUrl} from './apiUrl';

export const apiCall = async(params)=>{
    try {
        let response = await fetch(`${apiUrl}/api/${params}`);
        let json = await response.json();
        return json;
    } catch (error) {
        
    }
    
    
}