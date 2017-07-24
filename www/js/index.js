/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
  onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {

var el = document.querySelector('.js-fade');
    if (el.classList.contains('is-paused')){
        el.classList.remove('is-paused');
    }




document.getElementById('login').addEventListener('submit', userHome);
document.getElementById('create_asset_but').addEventListener('click', create_asset);
document.getElementById('track_asset_but').addEventListener('click', track_asset);

function userHome(e){
   e.preventDefault();
    document.getElementById('login_container').style.display = 'none';
    document.getElementById('home_container').style.display = 'block'; 
     console.log(123);
};

function create_asset(){
    document.getElementById('home_container').style.display = 'none';
    document.getElementById('create_asset').style.display = 'block'; 
};



function track_asset(){
    document.getElementById('home_container').style.display = 'none';
    document.getElementById('track_asset').style.display = 'block'; 
};



 var form = document.getElementById("create_asset_form");
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                sendData();
                getData();
            });


 var form1 = document.getElementById("track_asset_form");
            form1.addEventListener("submit", function (event) {
                event.preventDefault();
                getData();
            });


document.getElementById('asset_tag').addEventListener('focus',mscan);
function mscan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
                document.getElementById('asset_tag').value = result.text;
                document.getElementById('asset_tag').blur();
                /*alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
                },
        function (error) {
                alert("Scanning failed: " + error);
        },
        {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "default,QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS
        }
    );
};

document.getElementById('back').addEventListener('click',onBackKeyDown, false);
 document.addEventListener("backbutton", onBackKeyDown, false);  
    function onBackKeyDown(e) { 
     document.getElementById('create_asset').style.display = 'none';
    document.getElementById('home_container').style.display = 'block'; 
    document.getElementById('create_asset_form').reset();
    history.go(-1);
    //navigator.app.backHistory();
     }



document.getElementById('trackback').addEventListener('click',onBackKeyDown1, false);
 document.addEventListener("backbutton", onBackKeyDown1, false);  
    function onBackKeyDown1(e) { 
     document.getElementById('track_asset').style.display = 'none';
    document.getElementById('home_container').style.display = 'block'; 
    document.getElementById('track_asset_form').reset();
    history.go(-1);
    //navigator.app.backHistory();
     }

}



};
function sendData() {
    var form = document.getElementById("create_asset_form");
    var XHR = new XMLHttpRequest();
    var FD = new FormData(form);
    XHR.addEventListener("load", function(event) {
      form.reset();
     alert(event.target.responseText);
     });
    XHR.addEventListener("error", function(event) {
      alert('Oops! Something goes wrong.');
    });
    XHR.open("POST", "http://www.designerashish.org/assets/post.php");
    XHR.send(FD);
  }

function getData() {
    var form1 = document.getElementById("track_asset_form");
    var XHR1 = new XMLHttpRequest();
    var FD1 = new FormData(form1);
    XHR1.addEventListener("load", function(event) {
      form1.reset();

      fetcheddata = event.target.responseText;
      //document.getElementById('tracked_data').innerHTML = fetcheddata;
     //alert(event.target.responseText);
var html = '<ul><li><strong>Asset Tag</strong></li><li><strong>Asset Name</strong></li><li><strong>Create Date</strong></li></ul>';
fetcheddata = JSON.parse(fetcheddata);



for(i=0; i<fetcheddata.length;i++){
if(fetcheddata['0'].code==400){
    html = '<ul ><li class="notfound">'+fetcheddata['0'].message+'</li></ul>';
}
else{
    html += '<ul ><li>'+fetcheddata[i].tag+'</li><li>'+fetcheddata[i].name+'</li><li>'+fetcheddata[i].date+'</li></ul>';
} 

// console.log(fetcheddata[i].tag +"||"+ fetcheddata[i].name +"||"+ fetcheddata[i].date);
}
//html += '</ul>';
document.getElementById('tracked_data').innerHTML = html;
     });
    XHR1.addEventListener("error", function(event) {
      alert('Oops! Something goes wrong.');

    });
    XHR1.open("POST", "http://www.designerashish.org/assets/get.php");
    XHR1.send(FD1);
  }


app.initialize();