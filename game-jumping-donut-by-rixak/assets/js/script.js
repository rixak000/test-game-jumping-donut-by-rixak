setTimeout(function ()
{   // blur animation for main section
	gameSection = document.querySelector('.b-game');
	gameSection.classList.add('loaded');
}, 2000);

// game variables
function vars()
{
	characterPosition     = window.character.characterPosition;
	rockPosition          = window.terrain.rockPosition;
	rockSize              = window.terrain.rockSize;
	rockSizeMin           = window.terrain.minRockSize;
	rockSizeMax           = window.terrain.maxRockSize;
	characterCollide      = window.character.collide(window.character.donut, window.terrain.rock);
	gameSection           = document.querySelector('.b-game');
	statisticsSection     = document.querySelector('#game-statistic');
	countRunsSection      = document.querySelectorAll('.js_countRuns');
	countJumpSection      = document.querySelector('.js_countJump');
	countTotalGameSection = document.querySelector('.js_countTotal');
	
}

// function to getting date
function getDate()
{
	var today = new Date();
	var dd    = today.getDate();
	var mm    = today.getMonth() + 1;
	var yyyy  = today.getFullYear();
	if (dd < 10)
	{
		dd = '0' + dd;
	}
	
	if (mm < 10)
	{
		mm = '0' + mm;
	}
	return mm + '.' + dd + '.' + yyyy;
}

// variables to clean up
loopJump          = 0;
arrayJump         = [];
loopPosition      = 0;
startTime         = new Date().getTime();
interval          = 0;
characterPosition = 0;
intervalTimer = 0;

// settings variables
function settings_vars()
{
	settingsResumeBtn = document.querySelector('.settings-resume');
	settingsResetBtn  = document.querySelector('.settings-reset');
	settingsSwitcher  = document.querySelector('.js_switcher');
	popupBlur         = document.querySelector('.b-popup-blur');
	popupSettings     = document.querySelector('#settings');
	popupStart        = document.querySelector('#wellcome-game');
	
}

// timer
function timerReset(e)
{
	var timeSelector  = document.querySelector('.js_timer');
	clearInterval(intervalTimer);
	if (e)
	{
		timeSelector.innerHTML = e;
	}
	else
	{
		timeSelector.innerHTML = 0;
	}
	
	intervalTimer = setInterval(function ()
	{
		let currentNumber      = parseInt(timeSelector.textContent);
		let currentNumberMath      = currentNumber + 1;
		timeSelector.innerHTML = currentNumberMath;
	}, 1000);
}

// start game popup
function startGame()
{
	settings_vars();
	timerEvent(0);
	fade(popupBlur);
	popupStart.classList.remove('active');
	timerReset();
	setKeyboard(true);
}

// counter jumping
function countJump(event)
{
	vars();
	
	if (event == 'add')
	{
		let currentNumber          = parseInt(countJumpSection.textContent);
		countJumpSection.innerHTML = currentNumber + 1;
	}
	else
	{
		countJumpSection.innerHTML = 0;
	}
	
}

// counter runs
function countCompleted(event)
{
	vars();
	countRunsSection.forEach(function (item)
	{
		if (event == 'add')
		{
			
			let currentNumber = parseInt(item.textContent);
			item.innerHTML    = currentNumber + 1;
		}
		else
		{
			item.innerHTML = 0;
		}
	});
	
}

// counter total game
function countTotalGame(event)
{
	vars();
	if (event == 'add')
	{
		let currentNumber               = parseInt(countTotalGameSection.textContent);
		countTotalGameSection.innerHTML = currentNumber + 1;
	}
	else
	{
		countTotalGameSection.innerHTML = 0;
	}
	
}

// event to jumping
function jumpEvent()
{
	window.character.jump();
	if (loopJump == 0)
	{
		arrayJump.push(characterPosition);
		countJump('add');
		loopJump = 1;
	}
}

// database write timer
function timerEvent(lastTime)
{
	if (lastTime)
	{
		startTime = lastTime;
	}
	endTime   = new Date().getTime();
	totalTime = endTime - startTime;
	startTime = new Date().getTime();
	
}

// keyboard event
var keyEvents = function (t)
{
	
	var clickElement = document.getElementById('game-' + t.code);
	clickElement.classList.add('active');
	setTimeout(function ()
	{
		clickElement.classList.remove('active');
	}, 500);
	
	if ("Space" === t.code)
	{
		jumpEvent();
		window.character.run();
		loopJump = 0;
		t.preventDefault();
	}
	
	if ("KeyS" === t.code)
	{
		window.character.stop();
		t.preventDefault();
	}
	
	if ("KeyD" === t.code)
	{
		window.character.run();
		t.preventDefault();
	}
	
};

// keyboard event on auto mode
var keyEventsFalse = function (t)
{
	t.preventDefault();
	return false;
}

// functionality for automatic control
function intervalAutorun()
{
	interval = setInterval(function ()
	{
		vars();
		
		if (rockSize > 64.5)
		{
			get_minusFin = 120;
		}
		else
		{
			get_minusFin = 100;
		}
		if (characterPosition > (rockPosition - get_minusFin) && characterPosition < (rockPosition - 10))
		{
			jumpEvent();
		}
		else
		{
			window.character.run();
			loopJump = 0;
		}
	}, 10);
}

// fade function()
function fade(element)
{
	var op    = 1;
	var timer = setInterval(function ()
	{
		if (op <= 0.1)
		{
			clearInterval(timer);
			element.style.display = 'none';
		}
		element.style.opacity = op;
		element.style.filter  = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 50);
}

// fade function()
function unfade(element)
{
	var op                = 0.1;
	element.style.display = 'block';
	var timer             = setInterval(function ()
	{
		if (op >= 1)
		{
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter  = 'alpha(opacity=' + op * 100 + ")";
		op += op * 0.1;
	}, 20);
}

// event on click settings
function settings(status)
{
	settings_vars();
	
	if (status == 'open')
	{
		timerEvent();
		timerEvent(totalTime);
		unfade(popupBlur);
		popupSettings.classList.add('active');
		window.character.stop();
		window.character.donut.classList.add("popup");
		clearInterval(interval);
		setKeyboard(false);
	}
	else
	{
		timerEvent(totalTime);
		fade(popupBlur);
		timerReset();
		popupSettings.classList.remove('active');
		window.character.donut.classList.remove("popup");
	}
	
}

// toggle switch for mode
function switcherToggle(e)
{
	e.classList.toggle('active');
	let setStatus = e.getAttribute('data-run');
	if (setStatus === 'auto')
	{
		e.setAttribute('data-run', 'me');
	}
	else
	{
		e.setAttribute('data-run', 'auto');
	}
	
}

// main function to turn the keyboard on or off
function setKeyboard(has)
{
	
	if (has === true)
	{
		document.addEventListener('keypress', keyEvents, false);
		document.removeEventListener('keypress', keyEventsFalse, false);
	}
	else
	{
		if (keyEvents)
		{
			document.removeEventListener('keypress', keyEvents, false);
			document.addEventListener('keypress', keyEventsFalse, false);
		}
	}
	
}

// main function to turn auto mode
function setAutoRun(has)
{
	
	if (has == true)
	{
		setKeyboard(false);
		intervalAutorun();
	}
	else
	{
		clearInterval(interval);
		window.character.stop();
		setKeyboard(true);
	}
	
}

function autoRun(e)
{
	settings('close');
	let getStatus = settingsSwitcher.getAttribute('data-run');
	
	if (getStatus === 'auto')
	{
		window.character.stop();
		setAutoRun(true);
	}
	else
	{
		setAutoRun(false);
	}
	
	if (e == 'reset')
	{
		// Clear Statistics Table
		ajax_set('reset_data');
		// Games played
		countTotalGame('reset');
		// Runs completed
		countCompleted('reset');
		// Total jumps
		countJump('reset');
		window.character.characterAnnotation.style.left = 0 + "px", window.character.donut.style.left = 0 + "px";
	}
	
}

setKeyboard(false);

// interval for recording data coverage
setInterval(function ()
{
	vars();
	if (characterPosition > 1000)
	{
		if (loopPosition == 0)
		{
			loopPosition = 1;
			setDataObject('Success');
			countCompleted('add');
			timerReset();
		}
	}
	else
	{
		loopPosition = 0;
		if (characterCollide)
		{
			setDataObject('fail');
			timerReset();
		}
		
	}
}, 10);

// object to write data
function setDataObject(goal)
{
	vars();
	timerEvent();
	countTotalGame('add');
	statisticsSection.classList.add('loading-table');
	setDataObject__array = {
		date  : getDate(),
		rock_p: rockPosition,
		rock_s: rockSize,
		jump_p: arrayJump,
		time  : totalTime,
		goal  : goal
	};
	arrayJump            = [];
	return ajax_set(setDataObject__array);
	
}

// function to send data using WP
function ajax_set(data)
{
	vars();
	url    = gameSection.getAttribute('data-ajax');
	postID = gameSection.getAttribute('data-id');
	$.ajax({
		url    : url,
		type   : 'POST',
		data   : {action: 'js_action_update', id_post: postID, data_set: data},
		success: function (dataHtml)
		{
			
			statisticsSection.innerHTML = dataHtml;
			setTimeout(function ()
			{
				statisticsSection.classList.remove('loading-table');
			}, 1000);
		}
	});
}
