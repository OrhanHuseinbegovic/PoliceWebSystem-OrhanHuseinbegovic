var Constants = {
    get_api_base_url: function() {
        if(location.hostname === "localhost"){
            return 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/';
        }
        else{
            return 'https://walrus-app-9honu.ondigitalocean.app/backend/';
        }
    }
    //API_BASE_URL: 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/',
};