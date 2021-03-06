var clientId = '849957059352.apps.googleusercontent.com';
var apiKey = 'AIzaSyAr0JthSfMJAIEjs-ufDrsq5cVpakFivSc';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/userinfo.email'];

// Use a button to handle authentication the first time.
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  var authHolder = document.getElementById('auth-holder');
  var speakButton = document.getElementById('speak');

  if (authResult && !authResult.error) {
    authHolder.style.display = 'none';
    speakButton.onclick = function(event) {
      _gaq.push(['_trackEvent', 'onslyde-speak', 'vote']);
        ws.send('speak:' + JSON.stringify(userObject));
        if(speak.value === 'Cancel'){
          speak.value = 'I want to speak';
        }else{
          speak.value = 'Cancel';
        }
      };
    makeApiCall();

  } else {
    authHolder.style.display = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

var userObject = {name:'',email:'',org:'',pic:''};

function makeApiCall() {
//  console.log(gapi.auth.getToken())
  gapi.client.load('plus', 'v1', function() {
    var request = gapi.client.plus.people.get({
      'userId': 'me'
    });
    request.execute(function(resp) {
//      var heading = document.createElement('h4');
//      var image = document.createElement('img');
//      image.src = resp.image.url;
//      heading.appendChild(image);
//      heading.appendChild(document.createTextNode(resp.displayName));
      userObject.name = resp.displayName;
      userObject.pic = resp.image.url;
      document.querySelector('#speak').value = 'I want to speak';
//      document.getElementById('usercontent').appendChild(heading);
    });
  });
  gapi.client.load('oauth2', 'v2', function() {
    var request = gapi.client.oauth2.userinfo.get();
    request.execute(function(resp2){
      userObject.email = resp2.email;
    });
  });
}