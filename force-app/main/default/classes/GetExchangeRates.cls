public class GetExchangeRates {
    @AuraEnabled(cacheable = false)
    public static Map<String,Object> getExchangeMethod(String fromCurrencyCode, String toCurrencyCode) {
        Map<String,Object> responseMap;
        String strResponse;
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + fromCurrencyCode + '&to_currency=' + toCurrencyCode +'&apikey=RAZZVC4QDCZ1200H');
        req.setMethod('GET');
        req.setHeader('Authorization','OAuth '+UserInfo.getSessionId());
        req.setHeader('Authorization', 'Bearer '+UserInfo.getSessionId());
        try{
            HttpResponse res = new Http().send(req);
            if(res.getStatusCode()==200){
                strResponse = res.getBody();
            }
            system.debug(res.getBody()+'***Debug***');
            
        }
        catch(Exception error){
            system.debug('Error: '+error);
            throw error;
        }
        if(String.isNotBlank(strResponse)){
            responseMap = (Map<String,Object>)JSON.deserializeUntyped(strResponse);
        }
        system.debug(responseMap+'***Map***');
        return responseMap;
    }
}