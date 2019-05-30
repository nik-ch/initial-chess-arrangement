var BoardCreator;
(function() {
    var BLACK_FIGURES_START_RANGE = 9818;
    var WHITE_FIGURES_START_RANGE = 9812;
    var blackFiguresDictionary = createFiguresDictionary(BLACK_FIGURES_START_RANGE);
    var whiteFiguresDictionary = createFiguresDictionary(WHITE_FIGURES_START_RANGE);

    function drawBoard(boardContainer) {

        var topHeaderLine = createHeaderLine();
        boardContainer.firstElementChild.appendChild(topHeaderLine);

        for(var i = 8; i > 0; i--) {
            var row = document.createElement("tr");
            for(var j = 1; j < 11; j++) {
                var cell = document.createElement("td");
                //side borders with numbers
                if(j === 1 || j === 10) {
                    cell.innerHTML = i;
                } else {
                    switch(i) {
                        //main black line
                        case 8: {
                            cell.setAttribute("data-figure", blackFiguresDictionary[j]); 
                        } break;
                        //black pawn's line
                        case 7: {
                            cell.setAttribute("data-figure", blackFiguresDictionary[1]);
                        } break;
                        //main white line
                        case 1: {
                            cell.setAttribute("data-figure", whiteFiguresDictionary[j]); 
                        } break;
                        //whtie pawn's line
                        case 2: {
                            cell.setAttribute("data-figure", whiteFiguresDictionary[1]);
                        } break;
                    }
                    if(i%2 === 0) {
                        cell.setAttribute("class", j%2 === 0 ? "light-cell" : "dark-cell");
                    } else {
                        cell.setAttribute("class", j%2 === 0 ? "dark-cell" : "light-cell");
                    }     
                }
                row.appendChild(cell);
            }
            boardContainer.firstElementChild.appendChild(row);
        }

        var bottomHeaderLine = topHeaderLine.cloneNode(true);
        boardContainer.firstElementChild.appendChild(bottomHeaderLine);

        function createHeaderLine() {
            var startCharCode = 96;
            var row = document.createElement("tr");
            for(var i = 0; i < 10; i++) {
                var cell = document.createElement("td");
                if(i > 0 && i < 9) {
                    cell.innerHTML = String.fromCharCode(startCharCode + i);
                }
                row.appendChild(cell);
            }
            return row;
        }
    }

    function drawFigures(container, figuresDictionary) {
        for(var key in figuresDictionary) {
            var fig = document.createElement("span");
            fig.innerHTML = figuresDictionary[key];
            fig.setAttribute("data-figure", figuresDictionary[key]);
            fig.setAttribute("class", "figure");
            container.appendChild(fig);

            if(key === "1") {
                for(var i = 0; i < 7; i++) {
                    var cloneFig = fig.cloneNode(true);
                    container.appendChild(cloneFig);
                }
            } 
        }
    }

    function createFiguresDictionary(startRange) {
        var dictionary = {
            1: "&#".concat(startRange + 5, ";") //pawn
        };
        dictionary[6] = "&#".concat(startRange, ";"); //king
        dictionary[5] = "&#".concat(startRange + 1, ";"); //queen
        dictionary[2] = dictionary[9] = "&#".concat(startRange + 2, ";"); //rook
        dictionary[4] = dictionary[7] = "&#".concat(startRange + 3, ";"); //bishop
        dictionary[3] = dictionary[8] = "&#".concat(startRange + 4, ";"); //knight
        return dictionary;
    }

    BoardCreator = new function() {
        this.create = function(blackFigContainer, whiteFigContainer, boardContainer) {
            drawFigures(blackFigContainer, blackFiguresDictionary);
            drawFigures(whiteFigContainer, whiteFiguresDictionary);
            drawBoard(boardContainer);
        };
    }
})();