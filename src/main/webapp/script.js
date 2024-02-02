"use strict";
console.log("script.js");

let interval = null;
let timer = null;
let wakeLockStatus = null;
let wakeLockButton = null;
let cancelWakeLockButton = null;
let wakeLock = null;

function handleAquireWakelock () {
	console.log("handleAquireWakeLock");
	alert(WakeLock )
	if(!navigator.wakeLock){
		alert("WakeLock not supported!");
		return
	}

	navigator.wakeLock.request("screen")
		.then(startWakeLock)
		.catch(handleWakeLockError);
}

function startWakeLock (lock) {
	console.log("startWakeLock");
	wakeLock = lock;
	wakeLockButton.disabled = true;
	cancelWakeLockButton.disabled = false;
	wakeLockStatus.innerHTML = "Active";

	let targetTimeInSeconds = 5*60 //5 minutes

	interval = setInterval(function (){

		timer.innerHTML = Math.floor(targetTimeInSeconds / 60) +'m '+ (targetTimeInSeconds % 60) +'s'
		targetTimeInSeconds--
		if(targetTimeInSeconds < 0){
			cancelWakeLock();
		}
	}, 1000);
}

function cancelWakeLock () {
	console.log("cancelWakeLock", wakeLock);
	wakeLock.release().then(function () {
		clearInterval(interval);
		timer.innerHTML = "0s"
		wakeLock = null;
		wakeLockStatus.innerHTML = "-none-"
		wakeLockButton.disabled = false;
		cancelWakeLockButton.disabled = true;
		console.log("cancelWakeLock - cancelled");
	})
}

function handleWakeLockError (err) {
	timer.innerHTML = "0s"
	wakeLockStatus.innerHTML = "Failed"
	console.log("handleWakeLockError", err);
	wakeLock = null;
	wakeLockButton.disabled = false;
	cancelWakeLockButton.disabled = true;
}

window.onload = function(){
	console.log("document onload");
	timer = document.getElementById("wakelock-timer");
	wakeLockStatus = document.getElementById("wakelock-status");
	wakeLockButton = document.getElementById("aquire-wakelock");
	cancelWakeLockButton = document.getElementById("cancel-wakelock");

	wakeLockButton.addEventListener('click', handleAquireWakelock);
	cancelWakeLockButton.addEventListener('click', cancelWakeLock);
};

window.onerror = function(err){alert(err)}
