
function hsprogress() {
    var dtext = document.getElementById('download-txt');
    var cprogress = document.getElementById('circular-progress');
    let display = 0;

    if(display == 0)
    {
        dtext.style.display = 'none';
        cprogress.style.display = 'flex';
        console.log('shown');
    }
}

function show() {
    var dtext = document.getElementById('download-txt');
    var cprogress = document.getElementById('circular-progress');
    let myvar = 1;

    if (myvar == 1)
    {
        dtext.style.display = 'flex';
        cprogress.style.display = 'none';
        console.log(hided);
        alert("download completed");
    }

}


function startDownload() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/games/vscode.exe', true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        if (xhr.status === 200) {
            var blob = xhr.response;
            let dbtn = document.getElementById('dbtn');
            dbtn.style.backgroundColor = '#dbdbdb';
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'example.exe';
            downloadLink.click();
            show();
        }
    };

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            let dbtn = document.getElementById('dbtn');
            var progress = document.getElementById('progress');
            progress.style.width = percentComplete + '%';
            dbtn.style.backgroundColor = '#00ff5e';

            let circularProgress = document.querySelector(".circular-progress"),
                progressValue = document.querySelector(".progress-value");

                progressValue.textContent = `${percentComplete}%`
                circularProgress.style.background = `conic-gradient(#2ae837 ${percentComplete * 3.6}deg, #e2e2e2 0deg)`

        }
    };

    xhr.send();
}