var Constants = {
    //get_api_base_url: 'https://walrus-app-x43wn.ondigitalocean.app/'
    //API_BASE_URL: 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/',
    get_api_base_url: function(){
        if(location.hostname == 'localhost'){
            return 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/';
        }
        else{
            return 'https://walrus-app-x43wn.ondigitalocean.app/policewebsystem-orhanhuseinbego2/';
        }
    }
};