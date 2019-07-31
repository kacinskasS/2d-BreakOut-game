<!DOCTYPE html>
<html>
    <head>
	    <title>Breakout Game</title>
        <meta charset="UTF-8">
        <script src="script.js" defer></script>
	    <link rel="stylesheet" type="text/css" href="reset.css">
        <link rel="stylesheet" type="text/css" href="style.css">
	    <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700,900" rel="stylesheet">
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    </head>
    <body>
	    <div class="all">
		    <div class="controlsInfo">
			    <h2>Controls:</h2>
			    <p>Move left <span><i class="fas fa-arrow-left"></i></span> or <span>A</span> </p>
			    <p>Move right <span><i class="fas fa-arrow-right"></i></span> or <span>D</span> </p>
			    <p>Restart game <span><i class="fas fa-redo"></i></span></p>
			    <p>Start game <span><i class="fas fa-play"></i></span></p>
			    <p>Pause game <span><i class="fas fa-pause"></i></span></p>

		    </div>
            <canvas width="700" height="600" id="gameCanvas"></canvas>
	        <div class="buttons">
		        <button id="btnPlay" class="play"><i class="fas fa-play"></i></button>
		        <button id="btnReset" class="reset"><i class="fas fa-redo"></i></button>
		        <button id="btnPause" class="pause"><i class="fas fa-pause"></i></button>
		        <i class="fas fa-user" id="useris"></i>
		        <input type="text" placeholder="Player Name" id="playerName">
	        </div>
	    </div>
    </body>
</html>