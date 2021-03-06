/*
 * Created on Tue Dec 22 2020
 *
 * Licence: MIT Open Source Initiative
 * Author: Cameron Warje
 * Version: 0.1.0
 * 
 * This file contains the entirety of the extensions logic. 
 * Creates a button on the top of the page, which is used to show and hide distracting aspects of YouTube.
 * 
 */

// Create the new button
var btn = document.createElement("button");
btn.setAttribute('class', 'btn');
btn.setAttribute('id', 'focus-button')
btn.textContent = 'FOCUS';

// Initialize the new button state
var clicked = false;

// New button click logic
btn.onclick = function() {
  if (clicked) {
    clicked = false
    btn.textContent = 'FOCUS';
    document.getElementById("related").style.visibility = ""
    document.getElementById("secondary").style.visibility = ""
    document.getElementById("comments").style.visibility = ""
  } else {
    clicked = true
    btn.textContent = 'DISTRACT';
    document.getElementById("related").style.visibility = "hidden"
    document.getElementById("secondary").style.visibility = "hidden"
    document.getElementById("comments").style.visibility = "hidden"
  }
};

// callback executed when Youtube Notification icon finally loads
function handleButton(notificationButton) {

    // place the button on the page next to the Subscribe and Notification buttons
    var referenceNode = document.querySelector('#notification-preference-button');
    referenceNode.parentNode.insertBefore(btn, referenceNode);
}

// set up the mutation observer
var observer = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  // `me` is the MutationObserver instance
  var notificationButton = document.getElementById('notification-preference-button');
  if (notificationButton) {
    handleButton(notificationButton);
    me.disconnect(); // stop observing
    return;
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true
});