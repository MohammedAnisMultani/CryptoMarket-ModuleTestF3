// NOTE!!! ----> !!!IMPORTANT
// on fetching data i was getting this error -->({"status":{"error_code":429,"error_message":"You've exceeded the Rate Limit. Please visit https://www.coingecko.com/en/api/pricing to subscribe to our API plans for higher rate limits."}})
// so i made 2 method to create this project
// both the methods are functioning
// uncomment the second method if the first one showing the same error 


let searchBar = document.getElementById('searchBar')
let mktSort = document.getElementById('mkt')
let percentageSort = document.getElementById('percentage')
let btn = document.getElementById('submit')
let output = document.getElementById('output')

// _____________________________________________________________________________________________

// METHOD - 1

let API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

//Fetching data using async function:
async function fetching(API){
    
    try{
    let response = await fetch(API)
    let dataArray = await response.json()
    display(dataArray)
    
    }
    catch(e){
        console.log(e)
    }
}
    fetching(API)

    
// ___________________

//Fetching data using Promises

//     function fetching(API){     
//     fetch(API)
//     .then((response)=>response.json())
//     .then( data => display(data))
//         display(dataArray)
//     .catch((error)=>{console.log(error)})
//     }
    

// fetching(API)
// ___________________



// Displaying the data

function display(dataArray){
    output.innerHTML = ""
    for(let i=0; i<dataArray.length; i++){
let row = document.createElement('tr')
row.className = 'rowStyle'
if(dataArray[i].price_change_percentage_24h>=0){
row.innerHTML = 
` 
<td class="col1 cell"><img class="images" src="${dataArray[i].image}" alt=""> ${dataArray[i].id}</td>
        <td class = "cell">${dataArray[i].symbol}</td>
        <td class = "cell">$${dataArray[i].current_price}</td>
        <td class = "cell">$${dataArray[i].total_volume}</td>
        <td class = "cell green">${(dataArray[i].price_change_percentage_24h).toFixed(2)}%</td>
        <td class = "cell"> MKT Cap:$${dataArray[i].market_cap}</td>
        
`
}
else{
    row.innerHTML = 
` 
<td class="col1 cell"><img class="images" src="${dataArray[i].image}" alt=""> ${dataArray[i].id}</td>
        <td class = "cell">${dataArray[i].symbol}</td>
        <td class = "cell">$${dataArray[i].current_price}</td>
        <td class = "cell">$${dataArray[i].total_volume}</td>
        <td class = "cell red">${(dataArray[i].price_change_percentage_24h).toFixed(2)}%</td>
        <td class = "cell"> MKT Cap:$${dataArray[i].market_cap}</td>
        
`
}
output.append(row)
    }

}


// ____________________

// sorted by percentage - (descending order)


percentageSort.addEventListener("click",()=>{
    async function fetching(API){
        //Using async function
        try{
        let response = await fetch(API)
        let dataArray = await response.json()
        sortByPercentage(dataArray)
        
        }
        catch(e){
            console.log(e)
        }
    }
        fetching(API)
    
    })
    
    function sortByPercentage(data){
        let sortedData = data.sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
        display(sortedData)
    }

    // _______________________________

    // sort by MKT Cap - (descending order)

mktSort.addEventListener("click",()=>{
    async function fetching(API){
        //Using async function
        try{
        let response = await fetch(API)
        let dataArray = await response.json()
        sortByMKT(dataArray)
        
        }
        catch(e){
            console.log(e)
        }
    }
        fetching(API)
    
    })
    
    
    function sortByMKT(data){
       let sortedData =  data.sort((a,b)=>{
            if(a.market_cap > b.market_cap){
                return -1;
            }
            if(a.market_cap < b.market_cap){
                return 1;
            }
        })
        display(sortedData)
    }


// _____________________

// SearchFiltering


btn.addEventListener("click",()=>{
    async function fetching(API){
        //Using async function
        try{
        let response = await fetch(API)
        let dataArray = await response.json()
        searchFilter(dataArray)
        
        }
        catch(e){
            console.log(e)
        }
    }
        fetching(API)
    
})

function searchFilter(data){
    let searchedData = searchBar.value.toLowerCase().trim()
    let filterData = data.filter((value)=>{
        let id = value.id.toLowerCase()
        let symbol = value.symbol.toLowerCase()
        return (id.includes(searchedData) || symbol.includes(searchedData))
    })
    display(filterData)
}




// ______________________________________________________________________________________-

// NOTE: IF FIRST METHOD SHOWING SOME ERROR ONLY THEN UNCOMMENT THE BELOW CODES



// METHOD - 2

// _______________________-

// Data in the form of array


// let dataArray = [
//     {
//       id: "bitcoin",
//       symbol: "btc",
//       name: "Bitcoin",
//       image:
//         "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//       current_price: 65643,
//       market_cap: 1289035532109,
//       market_cap_rank: 1,
//       fully_diluted_valuation: 1376002143792,
//       total_volume: 32237903461,
//       high_24h: 66945,
//       low_24h: 65135,
//       price_change_24h: -468.37244513265614,
//       price_change_percentage_24h: -0.70846,
//       market_cap_change_24h: -9739805566.833008,
//       market_cap_change_percentage_24h: -0.74992,
//       circulating_supply: 19672750.0,
//       total_supply: 21000000.0,
//       max_supply: 21000000.0,
//       ath: 73738,
//       ath_change_percentage: -11.19445,
//       ath_date: "2024-03-14T07:10:36.635Z",
//       atl: 67.81,
//       atl_change_percentage: 96470.33793,
//       atl_date: "2013-07-06T00:00:00.000Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:27.631Z",
//     },
//     {
//       id: "ethereum",
//       symbol: "eth",
//       name: "Ethereum",
//       image:
//         "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
//       current_price: 3297.92,
//       market_cap: 395199315015,
//       market_cap_rank: 2,
//       fully_diluted_valuation: 395199315015,
//       total_volume: 15527410199,
//       high_24h: 3365.2,
//       low_24h: 3251.72,
//       price_change_24h: 1.01,
//       price_change_percentage_24h: 0.03063,
//       market_cap_change_24h: -1259402841.9951172,
//       market_cap_change_percentage_24h: -0.31766,
//       circulating_supply: 120068372.18484,
//       total_supply: 120068372.18484,
//       max_supply: null,
//       ath: 4878.26,
//       ath_change_percentage: -32.59025,
//       ath_date: "2021-11-10T14:24:19.604Z",
//       atl: 0.432979,
//       atl_change_percentage: 759388.17117,
//       atl_date: "2015-10-20T00:00:00.000Z",
//       roi: {
//         times: 66.1647408238698,
//         currency: "btc",
//         percentage: 6616.474082386981,
//       },
//       last_updated: "2024-04-04T05:59:36.031Z",
//     },
//     {
//       id: "tether",
//       symbol: "usdt",
//       name: "Tether",
//       image:
//         "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//       current_price: 1.0,
//       market_cap: 106226566752,
//       market_cap_rank: 3,
//       fully_diluted_valuation: 106226566752,
//       total_volume: 45265217609,
//       high_24h: 1.003,
//       low_24h: 0.995522,
//       price_change_24h: -0.000852814010639413,
//       price_change_percentage_24h: -0.08519,
//       market_cap_change_24h: 985314609,
//       market_cap_change_percentage_24h: 0.93624,
//       circulating_supply: 106149786847.074,
//       total_supply: 106149786847.074,
//       max_supply: null,
//       ath: 1.32,
//       ath_change_percentage: -24.44202,
//       ath_date: "2018-07-24T00:00:00.000Z",
//       atl: 0.572521,
//       atl_change_percentage: 74.61438,
//       atl_date: "2015-03-02T00:00:00.000Z",
//       roi: null,
//       last_updated: "2024-04-04T05:56:23.133Z",
//     },
//     {
//       id: "binancecoin",
//       symbol: "bnb",
//       name: "BNB",
//       image:
//         "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
//       current_price: 579.58,
//       market_cap: 88902570655,
//       market_cap_rank: 4,
//       fully_diluted_valuation: 88902570655,
//       total_volume: 2174847453,
//       high_24h: 580.04,
//       low_24h: 551.16,
//       price_change_24h: 24.23,
//       price_change_percentage_24h: 4.36271,
//       market_cap_change_24h: 3476308640,
//       market_cap_change_percentage_24h: 4.06937,
//       circulating_supply: 153856150.0,
//       total_supply: 153856150.0,
//       max_supply: 200000000.0,
//       ath: 686.31,
//       ath_change_percentage: -15.84445,
//       ath_date: "2021-05-10T07:24:17.097Z",
//       atl: 0.0398177,
//       atl_change_percentage: 1450423.53818,
//       atl_date: "2017-10-19T00:00:00.000Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:16.745Z",
//     },
//     {
//       id: "solana",
//       symbol: "sol",
//       name: "Solana",
//       image:
//         "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
//       current_price: 183.31,
//       market_cap: 81405358467,
//       market_cap_rank: 5,
//       fully_diluted_valuation: 104900762436,
//       total_volume: 4463927099,
//       high_24h: 191.63,
//       low_24h: 180.32,
//       price_change_24h: -4.997884226915659,
//       price_change_percentage_24h: -2.65403,
//       market_cap_change_24h: -2227947111.0006714,
//       market_cap_change_percentage_24h: -2.66395,
//       circulating_supply: 444812991.766666,
//       total_supply: 573195952.411258,
//       max_supply: null,
//       ath: 259.96,
//       ath_change_percentage: -29.75989,
//       ath_date: "2021-11-06T21:54:35.825Z",
//       atl: 0.500801,
//       atl_change_percentage: 36360.7068,
//       atl_date: "2020-05-11T19:35:23.449Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:27.799Z",
//     },
//     {
//       id: "usd-coin",
//       symbol: "usdc",
//       name: "USDC",
//       image:
//         "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
//       current_price: 1.001,
//       market_cap: 32898685191,
//       market_cap_rank: 6,
//       fully_diluted_valuation: 33048786432,
//       total_volume: 9462192424,
//       high_24h: 1.004,
//       low_24h: 0.995656,
//       price_change_24h: 0.000759,
//       price_change_percentage_24h: 0.07585,
//       market_cap_change_24h: 59313230,
//       market_cap_change_percentage_24h: 0.18062,
//       circulating_supply: 32871250999.3446,
//       total_supply: 33025534252.8432,
//       max_supply: null,
//       ath: 1.17,
//       ath_change_percentage: -14.67412,
//       ath_date: "2019-05-08T00:40:28.300Z",
//       atl: 0.877647,
//       atl_change_percentage: 14.01193,
//       atl_date: "2023-03-11T08:02:13.981Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:10.215Z",
//     },
//     {
//       id: "staked-ether",
//       symbol: "steth",
//       name: "Lido Staked Ether",
//       image:
//         "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
//       current_price: 3290.45,
//       market_cap: 31383501981,
//       market_cap_rank: 7,
//       fully_diluted_valuation: 31383501981,
//       total_volume: 93480092,
//       high_24h: 3358.88,
//       low_24h: 3248.32,
//       price_change_24h: -0.7180940706466572,
//       price_change_percentage_24h: -0.02182,
//       market_cap_change_24h: -135164461.20425797,
//       market_cap_change_percentage_24h: -0.42884,
//       circulating_supply: 9554702.59522044,
//       total_supply: 9554702.59522044,
//       max_supply: null,
//       ath: 4829.57,
//       ath_change_percentage: -32.01186,
//       ath_date: "2021-11-10T14:40:47.256Z",
//       atl: 482.9,
//       atl_change_percentage: 579.96704,
//       atl_date: "2020-12-22T04:08:21.854Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:35.619Z",
//     },
//     {
//       id: "ripple",
//       symbol: "xrp",
//       name: "XRP",
//       image:
//         "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
//       current_price: 0.57132,
//       market_cap: 31330645173,
//       market_cap_rank: 8,
//       fully_diluted_valuation: 57017537364,
//       total_volume: 1506687697,
//       high_24h: 0.592032,
//       low_24h: 0.56334,
//       price_change_24h: -0.013993244219227765,
//       price_change_percentage_24h: -2.39073,
//       market_cap_change_24h: -823119795.6295967,
//       market_cap_change_percentage_24h: -2.55995,
//       circulating_supply: 54942400126.0,
//       total_supply: 99987738355.0,
//       max_supply: 100000000000.0,
//       ath: 3.4,
//       ath_change_percentage: -83.23284,
//       ath_date: "2018-01-07T00:00:00.000Z",
//       atl: 0.00268621,
//       atl_change_percentage: 21112.9463,
//       atl_date: "2014-05-22T00:00:00.000Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:32.263Z",
//     },
//     {
//       id: "dogecoin",
//       symbol: "doge",
//       name: "Dogecoin",
//       image:
//         "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
//       current_price: 0.175521,
//       market_cap: 25124013055,
//       market_cap_rank: 9,
//       fully_diluted_valuation: 25124829322,
//       total_volume: 2749037554,
//       high_24h: 0.187069,
//       low_24h: 0.171171,
//       price_change_24h: -0.008569059130840134,
//       price_change_percentage_24h: -4.65481,
//       market_cap_change_24h: -1370584323.1288033,
//       market_cap_change_percentage_24h: -5.17307,
//       circulating_supply: 143738606383.705,
//       total_supply: 143743636383.705,
//       max_supply: null,
//       ath: 0.731578,
//       ath_change_percentage: -76.13647,
//       ath_date: "2021-05-08T05:08:23.458Z",
//       atl: 8.69e-5,
//       atl_change_percentage: 200789.33576,
//       atl_date: "2015-05-06T00:00:00.000Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:37.069Z",
//     },
//     {
//       id: "cardano",
//       symbol: "ada",
//       name: "Cardano",
//       image:
//         "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
//       current_price: 0.5711,
//       market_cap: 20124668185,
//       market_cap_rank: 10,
//       fully_diluted_valuation: 25673433602,
//       total_volume: 467075751,
//       high_24h: 0.59344,
//       low_24h: 0.561905,
//       price_change_24h: -0.01558056691561338,
//       price_change_percentage_24h: -2.65572,
//       market_cap_change_24h: -537694119.6226692,
//       market_cap_change_percentage_24h: -2.60229,
//       circulating_supply: 35274209222.0096,
//       total_supply: 45000000000.0,
//       max_supply: 45000000000.0,
//       ath: 3.09,
//       ath_change_percentage: -81.50045,
//       ath_date: "2021-09-02T06:00:10.474Z",
//       atl: 0.01925275,
//       atl_change_percentage: 2866.14672,
//       atl_date: "2020-03-13T02:22:55.044Z",
//       roi: null,
//       last_updated: "2024-04-04T05:59:45.592Z",
//     },
//   ];
// // ____________________________________________________________



// // __________________

// // displaying the data


// function display(dataArray){
//     output.innerHTML = ""
//     for(let i=0; i<dataArray.length; i++){
// let row = document.createElement('tr')
// row.className = 'rowStyle'
// if(dataArray[i].price_change_percentage_24h>=0){
// row.innerHTML = 
// ` 
// <td class="col1 cell"><img class="images" src="${dataArray[i].image}" alt=""> ${dataArray[i].id}</td>
//         <td class = "cell">${dataArray[i].symbol}</td>
//         <td class = "cell">$${dataArray[i].current_price}</td>
//         <td class = "cell">$${dataArray[i].total_volume}</td>
//         <td class = "cell green">${(dataArray[i].price_change_percentage_24h).toFixed(2)}%</td>
//         <td class = "cell"> MKT Cap:$${dataArray[i].market_cap}</td>
        
// `
// }
// else{
//     row.innerHTML = 
// ` 
// <td class="col1 cell"><img class="images" src="${dataArray[i].image}" alt=""> ${dataArray[i].id}</td>
//         <td class = "cell">${dataArray[i].symbol}</td>
//         <td class = "cell">$${dataArray[i].current_price}</td>
//         <td class = "cell">$${dataArray[i].total_volume}</td>
//         <td class = "cell red">${(dataArray[i].price_change_percentage_24h).toFixed(2)}%</td>
//         <td class = "cell"> MKT Cap:$${dataArray[i].market_cap}</td>
        
// `
// }
// output.append(row)
//     }

// }

// display(dataArray)


// _____________________

// SearchFiltering


// btn.addEventListener("click",()=>{
//     searchFilter(dataArray)
// })

// function searchFilter(data){
//     let searchedData = searchBar.value.toLowerCase().trim()
//     let filterData = data.filter((value)=>{
//         let id = value.id.toLowerCase()
//         let symbol = value.symbol.toLowerCase()
//         return (id.includes(searchedData) || symbol.includes(searchedData))
//     })
//     display(filterData)
// }

// _______________________

// sort by MKT Cap - (descending order)

// mktSort.addEventListener("click",()=>{
// sortByMKT(dataArray)
// })

// function sortByMKT(data){
//    let sortedData =  data.sort((a,b)=>{
//         if(a.market_cap > b.market_cap){
//             return -1;
//         }
//         if(a.market_cap < b.market_cap){
//             return 1;
//         }
//     })
//     display(sortedData)
// }

// ____________________

// sorted by percentage - (descending order)


// percentageSort.addEventListener("click",()=>{
//     sortByPercentage(dataArray)
//     })
    
//     function sortByPercentage(data){
//         let sortedData = data.sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
//         display(sortedData)
//     }


























