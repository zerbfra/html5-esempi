	// Inizializzo il worker
	var running = false;
    var statusDiv = document.getElementById('status');
    var button = document.getElementById('toggleWorker');
  
  
    var worker = new Worker('worker-task.js'); // creo il worker
    
    worker.addEventListener('message', function (event) {
        var currentStatus = statusDiv.innerHTML;
        statusDiv.innerHTML = "<p>" + event.data + "</p>" + currentStatus;
        if (event.data === "Done!") {
            running = false;
            button.value = "start worker";
        }
    });

    button.onclick = function () {
        running = !running;
        if (running) {
            statusDiv.innerHTML = "";
            button.value = "stop worker";
        } else {
            button.value = "start worker";
            
        }
        worker.postMessage(); // avvio il worker

    };
    

    




    

