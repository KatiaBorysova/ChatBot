//Check page load
$(document).ready(function() {
	startChat();
});

function startChat() {
	setListenerOnSend();
};

function setListenerOnSend() {
	$('div.send_message').click(function() {
		getUserInput();		
	});
	$('input.message_input').keyup(function (e) {
        if (e.which === 13) {
           getUserInput();	 
        }
    });
};

function getUserInput() {
	var userInput = $('input.message_input').val();
		appendUserInput(userInput);
		botAnswer(userInput);
};

function appendUserInput(input) {
	$('ul.messages').append(replyTemplate(input, 'left'));
	//Clear user Input after append
	$('input.message_input').val('');
	//Scroll chat window to last message
	scrollToBottom();
};

function botAnswer(input) {
	var loweredInput = input.toLowerCase();
	var answer;

	var loweredInput = input.toLowerCase();
	if (loweredInput === 'hello') {
		answer = 'Hello dear user'
	} else if (loweredInput === 'bye') {
		answer = 'Have a nice day'
	} else if (loweredInput === 'how are you?') {
		answer = 'I`m fine. And how are you?'
		
	} else if (loweredInput.search('weather') >= 0) {
		 answer = 'It is sunny'
	} else if (loweredInput.search('temperature') >= 0) {
		answer = 'It`s +28 Outside'
	} else {
		answer = 'Sorry, can you rephrase your question?';
	}
    appendBotAnswer(answer);
};


function appendBotAnswer(answer) {
	setTimeout(function() {
		$('ul.messages').append(replyTemplate(answer, 'right'));
		scrollToBottom();	
	}, 1000);
	
};

function replyTemplate(input, messageSide) {
	return '<li class="message ' + messageSide + ' appeared">'
				+'<div class="avatar"></div>'
				+'<div class="text_wrapper">'
				   +'<div class="text">'+input +'</div>'
				   +'<div class="current_time">'+currentTime()+'</div>'
				+'</div>'
			+'</li>'

};

function currentTime(){
	var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
	if(minutes < 10) {
    	minutes = '0' + minutes;
	}
	var time = hours + ':' + minutes;
	return time;
};

function scrollToBottom() {
	$('ul.messages').animate({ scrollTop: $('ul.messages')[0].scrollHeight }, 300);
};

