import { LightningElement, track } from 'lwc';
import getExchangeMethod from '@salesforce/apex/GetExchangeRates.getExchangeMethod';

export default class HttpCallout extends LightningElement {
    @track fromCurrencyValue;
    @track toCurrencyValue;
    @track options = options;
    @track finalResult;
    @track fromAmount;
    @track toAmount;


    handleFromCurrencyChange(event) {
        this.fromCurrencyValue = event.detail.value;
        console.log('From Currency: ' + this.fromCurrencyValue)
    }

    handleToCurrencyChange(event) {
        this.toCurrencyValue = event.detail.value;
        console.log('To Currency: ' + this.toCurrencyValue);
    }

    // handleCurrencyConversion(){
    //     fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + this.fromCurrencyValue + '&to_currency=' + this.toCurrencyValue+'&apikey=RAZZVC4QDCZ1200H',{

    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // "Authorization": "OAuth " 
    //         }
    //     })
    //     .then(response => {
    //         return response.json(); 
    //     })
    //     .then(jsonResponse => {
    //         let objResponse = {
    //             From_Currency_Name:'',
    //             From_Currency_Code:'',
    //             To_Currency_Name: '',
    //             To_Currency_Code:'',
    //             Last_Refreshed:'',
    //             Exchange_Rate: ''

    //         }
    //         console.log('JSON Response ',JSON.stringify(jsonResponse));
    //         let exchangeData = jsonResponse['Realtime Currency Exchange Rate'];
    //         console.log('Exchange Data: ' + JSON.stringify(exchangeData));
    //         objResponse.From_Currency_Name = exchangeData['2. From_Currency Name'];
    //         objResponse.From_Currency_Code = exchangeData['1. From_Currency Code'];
    //         objResponse.To_Currency_Name = exchangeData['4. To_Currency Name'];
    //         objResponse.To_Currency_Code = exchangeData['3. To_Currency Code'];
    //         objResponse.Last_Refreshed = exchangeData['6. Last Refreshed'];
    //         objResponse.Exchange_Rate = exchangeData['5. Exchange Rate'];
    //         console.log('Response: ' + JSON.stringify(objResponse));
    //         this.finalResult = objResponse;
    //         this.toAmount = parseFloat(objResponse.Exchange_Rate) * parseFloat(this.fromAmount);
    //     })
    //     .catch(error => {
    //         console.log('Error: ' + error);
    //     });
    // }

    handleCurrencyConversion() {
        getExchangeMethod({ fromCurrencyCode: this.fromCurrencyValue, toCurrencyCode: this.toCurrencyValue })
            .then(result => {
                // Log the result as a JSON string for debugging purposes
                console.log('Result:', JSON.parse(JSON.stringify(result)));
                var jsonResponse = result;
                let objResponse = {
                    From_Currency_Name: '',
                    From_Currency_Code: '',
                    To_Currency_Name: '',
                    To_Currency_Code: '',
                    Last_Refreshed: '',
                    Exchange_Rate: ''

                }
                console.log('JSON Response ', JSON.stringify(jsonResponse));
                let exchangeData = jsonResponse['Realtime Currency Exchange Rate'];
                console.log('Exchange Data: ' + JSON.stringify(exchangeData));
                objResponse.From_Currency_Name = exchangeData['2. From_Currency Name'];
                objResponse.From_Currency_Code = exchangeData['1. From_Currency Code'];
                objResponse.To_Currency_Name = exchangeData['4. To_Currency Name'];
                objResponse.To_Currency_Code = exchangeData['3. To_Currency Code'];
                objResponse.Last_Refreshed = exchangeData['6. Last Refreshed'];
                objResponse.Exchange_Rate = exchangeData['5. Exchange Rate'];
                console.log('Response: ' + JSON.stringify(objResponse));
                this.finalResult = objResponse;
                this.toAmount = parseFloat(objResponse.Exchange_Rate) * parseFloat(this.fromAmount);
            })
            .catch(error => {
                // Handle any errors that occur during the process
                console.log('Error:', error);
            });
    }


    handleFromAmount(event) {
        this.fromAmount = event.target.value;
        console.log('From Amount: ', this.fromAmount);
    }

}

const options = [
    {
        label: 'EUR',
        value: 'EUR'
    },
    {
        label: 'USD',
        value: 'USD'
    },

    {
        label: 'CAD',
        value: 'CAD'
    },

    {
        label: 'INR',
        value: 'INR'
    },

    {
        label: 'GBP',
        value: 'GBP'
    },
    {
        label: 'AUD',
        value: 'AUD'
    },
    {
        label: 'JPY',
        value: 'JPY'
    },
    {
        label: 'CNY',
        value: 'CNY'
    },
    {
        label: 'SEK',
        value: 'SEK'
    },
    {
        label: 'CHF',
        value: 'CHF'
    },
    {
        label: 'CAD',
        value: 'CAD'
    },
    {
        label: 'MYR',
        value: 'MYR'
    },
    {
        label: 'NZD',
        value: 'NZD'
    },
    {
        label: 'ZAR',
        value: 'ZAR'
    },
    {
        label: 'ALL',
        value: 'ALL'
    },
    {
        label: 'BRL',
        value: 'BRL'
    },
    {
        label: 'RUB',
        value: 'RUB'
    },
    {
        label: 'BGN',
        value: 'BGN'
    },
    {
        label: 'TRY',
        value: 'TRY'
    },
    {
        label: 'CZK',
        value: 'CZK'
    },
    {
        label: 'DKK',
        value: 'DKK'
    }
]

// JSON Response  {"Realtime Currency Exchange Rate":{"1. From_Currency Code":"USD","2. From_Currency Name":"United States Dollar","3. To_Currency Code":"INR","4. To_Currency Name":"Indian Rupee","5. Exchange Rate":"83.92600000","6. Last Refreshed":"2024-08-09 14:02:02","7. Time Zone":"UTC","8. Bid Price":"83.92540000","9. Ask Price":"83.92990000"}}