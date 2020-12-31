import {apiUrl} from './apiUrl';

export const apiPost = async(params,options)=>{
    try {
        let response = await fetch(`${apiUrl}/api/${params}`,options);
        let json = await response.json();
        return json;
    } catch (error) {
        
    }
    
    
}