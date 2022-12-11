import dotenv from 'dotenv';
import twit from 'twit';

dotenv.config();

let Twitter = new twit({
                        consumer_key: process.env.CONSUMER_KEY,
                        consumer_secret: process.env.CONSUMER_SECRET,
                        access_token: process.env.ACCESS_TOKEN,
                        access_token_secret: process.env.ACCESS_TOKEN_SECRET, 
                    })

let retweet  = () => {
    let params = {
        q: '#100DaysOfX, #100daysofx',
        result_type: 'recent',
    }

    Twitter.get('search/tweets', params, (err, data) => {
        // if no error
        if(!err){
            // grab ID of tweet to retweet
            let retweets = data.statuses;
            for(let i=0; i<retweets.length; i++){    
                let retweetId = retweets[i].id_str;

                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, (e, response) => {
                    if(response)
                        console.log(`Retweeted!!`);
                    if(e)
                        console.log(`Something went wrong while RETWEETING... Error is: ${e.message}`);
                });
            }
        }

        // if unable to search
        else {
            console.log(`Something went wrong while searching... Error is: ${err.message}`);
        }
    });
}

let favorite  = () => {
    let params = {
        q: '#100DaysOfX, #100daysofx',
        result_type: 'recent',
    }

    Twitter.get('search/tweets', params, (err, data) => {
        // if no error
        if(!err){
            // grab ID of tweet to favorite
            let favorites = data.statuses;
            for(let i=0; i<favorites.length; i++){    
                let favoriteId = favorites[i].id_str;

                Twitter.post('favorites/create', {
                    id: favoriteId
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


// grab and retweet as soo as program is running...
retweet()
favorite()
// retweet in every 50 minutes
setInterval(retweet, 1000 * 60);
setInterval(favorite, 1000 * 60);