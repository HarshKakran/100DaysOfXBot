import dotenv from 'dotenv';
import twit from 'twit';

dotenv.config();

let Twitter = new twit({
                        consumer_key: process.env.CONSUMER_KEY,
                        consumer_secret: process.env.CONSUMER_SECRET,
                        access_token: process.env.ACCESS_TOKEN,
                        access_token_secret: process.env.ACCESS_TOKEN_SECRET, 
                    })

let retweet_and_fav  = (hashtags) => {
    let params = {
        q: hashtags,
        result_type: 'recent',
    }
    console.log(`Let's get some tweets!`)
    Twitter.get('search/tweets', params, (err, data) => {
        // if no error
        if(!err){
            // grab ID of tweet to retweet
            console.log(`No Error in searching...`)

            let tweets = data.statuses;
            console.log(`Tweets: ${tweets.length}`)
            for(let i=0; i<tweets.length; i++){    
                let tweetId = tweets[i].id_str;

                console.log(`Time to retweet ${tweetId}`);
                Twitter.post('statuses/retweet/:id', {
                    id: tweetId
                }, (e, response) => {
                    if(response)
                    console.log(`Retweeted!!`);
                    if(e)
                    console.log(`Something went wrong while RETWEETING... Error is: ${e.message}`);
                });
                console.log(`Time to favorite ${tweetId}`);
                Twitter.post('favorites/create', {
                    id: tweetId
                }, (e, response) => {
                    if(response)
                        console.log(`FAVORITED!!`);
                    if(e)
                        console.log(`Cannot be FAVORITE... Error is: ${e.message}`);
                });
            }
        }

        // if unable to search
        else {
            console.log(`Something went wrong while searching... Error is: ${err.message}`);
        }
    });
}

// let favorite  = () => {
//     let params = {
//         q: '#100DaysOfX, #100daysofx, #100DaysOfCode, #100DaysOfHealth, #100DaysOfFitness',
//         result_type: 'recent',
//     }

//     Twitter.get('search/tweets', params, (err, data) => {
//         // if no error
//         if(!err){
//             // grab ID of tweet to favorite
//             let favorites = data.statuses;
//             for(let i=0; i<favorites.length; i++){    
//                 let favoriteId = favorites[i].id_str;

//                 Twitter.post('favorites/create', {
//                     id: favoriteId
//                 }, (e, response) => {
//                     if(response)
//                         console.log(`FAVORITED!!`);
//                     if(e)
//                         console.log(`Cannot be FAVORITE... Error is: ${e.message}`);
//                 });
//             }
//         }

//         // if unable to search
//         else {
//             console.log(`Something went wrong while searching... Error is: ${err.message}`);
//         }
//     });
// }

console.log(`Starting #100DaysOfX`);
retweet_and_fav('#100DaysOfX, #100daysofx');

console.log(`Starting #100DaysOfCode`)
setTimeout(retweet_and_fav, 1000*60, '#100DaysOfCode, #100daysofcodingchallenge');


console.log(`Starting #100DaysOfHealth and Fitness`)
setTimeout(retweet_and_fav, 1000*60, '#100DaysOfHealth, #100DaysOfFitness');
