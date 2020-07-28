// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const { LinkOutSuggestion } = require('actions-on-google');
const { Permission } = require('actions-on-google');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

var dateTemp;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function incorrectSeatNumberHandler(agent) {
        let session_vars = agent.getContext('session_vars');
        var geo_city = session_vars.parameters['geo-city'];
        var geo_city1 = session_vars.parameters['geo-city1'];
        var travel_class = session_vars.parameters.travel_class;
        var res = `Awesome, please select your seat for flight from ${geo_city} to ${geo_city1} for ${travel_class} ?`;
        var seat = 'A | 1 2 3 4 5 6' + '\n' + 'B | 1 2 3 4 5 6' + '\n' + 'C | 1 2 3 4 5 6';
        agent.add(res);
        agent.add(seat);
    }

    function slotFillingFlightHandler(agent) {
        var geo_city = agent.parameters['geo-city'];
        var geo_city1 = agent.parameters['geo-city1'];

        if (!geo_city) {
            agent.add(`What's the origin of flight?`);
            agent.add(new Suggestion(`Detect Location`));
            agent.add(new Suggestion(`Delhi`));
            agent.add(new Suggestion(`Mumbai`));
            agent.add(new Suggestion(`Banglore`));
        }
        else if (!geo_city1) {
            agent.add('Some dummy text');
            agent.setFollowupEvent({
                'name': 'flight_destination_event',
                'parameters': {
                    'geo-city': geo_city,

                }
            });
        }
        else {
            agent.setContext({
                'name': 'flight_context',
                'lifespan': 1,
                'parameters': {
                    'geo-city': geo_city,
                    'geo-city1': geo_city1
                }
            });
            agent.add('Some dummy text');
            agent.setFollowupEvent('flight_date_event');
        }
    }

    function roomBookHandler(agent) {
        let session_vars = agent.getContext('session_vars');
        var geo_city = session_vars.parameters['geo-city1'];
        var date = session_vars.parameters.date;
        var date_original = session_vars.parameters['date.original'];

        agent.setContext({
            'name': 'bookrooms_date_context',
            'lifespan': 1,
            'parameters': {
                'date': date
            }
        });
        agent.add('Some dummy text');
        agent.setFollowupEvent('hotel_name_event');

    }
	
    function startAgainHandler(agent) {
        agent.add('Some dummy text');
        agent.setContext({ 'name': 'session_vars', 'lifespan': 0 });
        agent.setFollowupEvent('Welcome');
    }

    function dateChangeHandler(agent) {
        let session_vars = agent.getContext('session_vars');
        var geo_city = session_vars.parameters['geo-city'];
        var geo_city1 = session_vars.parameters['geo-city1'];

        agent.setContext({
            'name': 'flight_context',
            'lifespan': 1,
            'parameters': {
                'geo-city': geo_city,
                'geo-city1': geo_city1
            }
        });
        agent.add('Some dummy text');
        agent.setFollowupEvent('flight_date_event');

    }

    function destinationChangeHandler(agent) {
        let session_vars = agent.getContext('session_vars');
        var geo_city = session_vars.parameters['geo-city'];
        agent.add('Some dummy text');
        agent.setFollowupEvent({
            'name': 'flight_destination_event',
            'parameters': {
                'geo-city': geo_city,

            }
        });
    }

    function redirectToPaymentHandler(agent) {
        agent.add('Some dummy text');
        agent.setFollowupEvent('payment_confirmation_link_event');
    }

    function getSeatHandler(agent) {
        agent.add('Some dummy text');
        agent.setFollowupEvent('flight_seat_event');
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function paymentHandler(agent) {
        agent.add('Some dummy text');
        agent.setFollowupEvent('payment_confimration_link_event');

    }

    function requestPermissionHandler(agent) {
        let conv = agent.conv();
        conv.ask(new Permission({
            context: 'To give results in your area',
            permissions: 'DEVICE_PRECISE_LOCATION',
        }));
        agent.add(conv);
    }

    function userLocationHandler(agent) {
        let conv = agent.conv();
        var city = conv.device.location.city;
        agent.add('Some dummy text');
        agent.setFollowupEvent({
            'name': 'flight_destination_event',
            'parameters': {
                'geo-city': city,

            }
        });
    }

    function paymentConfirmationHandler(agent) {
        return delay(3000).then(() => {
            let conv = agent.conv();
            var randomId = Math.random().toString(36).substr(2, 9);
            var msg = `Thank you for your payment! Your tickets have been booked and your booking id is ${randomId}`;
            conv.ask(msg);
            conv.ask('Do you want to book hotel room also ?');
            agent.add(conv);
        });

    }

    function noBookingHandler(agent) {
        dateTemp = Math.floor(Date.now() / 1000);
        agent.add('End');
    }

    function roomBookFollowUpHandler(agent) {
        var date1 = Math.floor(Date.now() / 1000);
        if (date1 - dateTemp <= 20) {
            let session_vars = agent.getContext('session_vars');
            var geo_city1 = session_vars.parameters['geo-city1'];
            agent.add(`Do you want to book room for ${geo_city1} ?`);
        }
        else {
            agent.setContext({ 'name': 'session_vars', 'lifespan': 0 });
            agent.add('Some dummy text');
            agent.setFollowupEvent('book_rooms_location_event');
        }

    }

    function roomBookFollowUpNoHandler(agent) {
        agent.setContext({ 'name': 'session_vars', 'lifespan': 0 });
        agent.add('Some dummy text');
        agent.setFollowupEvent('book_rooms_location_event');
    }

    function paymentProcessorHandler(agent) {
        return delay(4000).then(() => {
            agent.add('Some dummy text');
            agent.setFollowupEvent('payment_processor_event');
        });
    }

    function paymentProcessorHandler1(agent) {
        return delay(4000).then(() => {
            agent.add('Some dummy text');
            agent.setFollowupEvent('book_flights_payment_confirmation_event');
        });
    }



    // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('book_flights', slotFillingFlightHandler);
    intentMap.set('book_flights_incorrect_seatno', incorrectSeatNumberHandler);
    intentMap.set('book_flights_followup_get_seat- no', redirectToPaymentHandler);
    intentMap.set('book_flights_startover', startAgainHandler);
    intentMap.set('book_flights_payment_conf_room_book-yes', roomBookHandler);
    intentMap.set('book_flights_change_destination', destinationChangeHandler);
    intentMap.set('Sample', paymentProcessorHandler);
    intentMap.set('book_flights_payment_processor1', paymentProcessorHandler1);
    intentMap.set('book_flights_change_date', dateChangeHandler);
    intentMap.set('book_flights_followup_get_seat - yes', getSeatHandler);
    intentMap.set('request_permission', requestPermissionHandler);
    intentMap.set('user_info', userLocationHandler);
    intentMap.set('book_flights_payment_processor', paymentProcessorHandler);
    intentMap.set('book_flights_payment_confirmation', paymentConfirmationHandler);
    intentMap.set('book_flights_payment_conf_room_book-no', noBookingHandler);
    intentMap.set('book_flights_followup_room_book', roomBookFollowUpHandler);
    intentMap.set('book_flights_followup_room_book - yes', roomBookHandler);
    intentMap.set('book_flights_followup_room_book - no', roomBookFollowUpNoHandler);
    agent.handleRequest(intentMap);
});
