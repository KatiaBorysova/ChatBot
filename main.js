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
}

function getUserInput() {
	var userInput = $('input.message_input').val();
		appendUserInput(userInput);
		botAnswer(userInput);
	
}

function appendUserInput(input) {
	$('ul.messages').append(replyTemplate(input, 'left'));
	//Clear user Input after append
	$('input.message_input').val('');
	//Scroll chat window to last message
	scrollToBottom();
}



function botAnswer(input) {
	var loweredInput = input.toLowerCase();
	if (loweredInput === 'hello') {
		var answer = 'Hello dear user'
		appendBotAnswer(answer);
	} else if (loweredInput === 'bye') {
		var answer = 'Have a nice day'
		appendBotAnswer(answer);
	} else if (loweredInput === 'how are you?') {
		var answer = 'I`m fine. And how are you?'
		appendBotAnswer(answer);
	} else if (loweredInput.search('weather') >= 0) {
		var answer = 'It is sunny'
		appendBotAnswer(answer);
	} else if (loweredInput.search('temperature') >= 0) {
		var answer = 'It`s +28 Outside'
		appendBotAnswer(answer);
	} else {
		var answer = 'Sorry, can you rephrase your question?';
		appendBotAnswer(answer);
	}
}


function appendBotAnswer(answer) {
	setTimeout(function() {
		$('ul.messages').append(replyTemplate(answer, 'right'));
		scrollToBottom();	
	}, 1000);
	
}

function replyTemplate(input, messageSide) {
	return '<li class="message ' + messageSide + ' appeared">'
				+'<div class="avatar"></div>'
				+'<div class="text_wrapper">'
				   +'<div class="text">'+input +'</div>'
				   +'<div class="current_time">'+currentTime()+'</div>'
				+'</div>'
			+'</li>'

}

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
}




