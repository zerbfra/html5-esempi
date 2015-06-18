	var WHEN_TO_STOP       = 1000;
	var running = false;
	var count = 0;

	function compute(start) {
        var n = start;
        var i, hasDivisor;
        
        if (!running) { 
        	// messaggio se fermo il worker
            postMessage("Worker fermato!");
        } else {
            
                hasDivisor = false;
                for (i = 2; i <= Math.sqrt(n); i += 1) {
                    if (n % i === 0) {
                        hasDivisor = true;
                        break;
                    }
                }
                if (!hasDivisor) {
                    // trovato un numero primo!
                    postMessage(n);
                    count++;
                }
                n += 1;
    

            if (n < WHEN_TO_STOP) {
                // finchè non calcolo fino a 1000, mando in loop la funzione
                setTimeout(function () { compute(n); }, 1);
            } else {
                // terminato
                running = false;
                postMessage("Primi calcolati fino a "+WHEN_TO_STOP);
            }
        }


    }
    
    addEventListener('message', function (event) {
      
        if (running === false) {
            postMessage("Avvio...");
            count = 0;
            running = true;
            compute(1);
        } else {
            postMessage("Fermo...");
            running = false;
        }
    });
    
