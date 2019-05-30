(function() {
    var HIGHLIGHTED_CELL_CLASS_NAME = "highlighted-cell"; 
    var SELECTED_FIGURE_CLASS_NAME = "selected-figure";
    var DATA_ATTR_NAME = "data-figure";

    var table = document.getElementById("board");
    var selectedFigure;

    var figuresContainers = document.querySelectorAll("div.figures");
    BoardCreator.create(figuresContainers[0], figuresContainers[1], table)

    table.addEventListener("click", function(e) {
        if(selectedFigure != null) {
            var target = e.target;
            if(target.nodeName !== "TD") return false;

            if(target.className.indexOf(HIGHLIGHTED_CELL_CLASS_NAME) !== -1 && !target.children.length) {
                removeFigureHighlighting(selectedFigure);
                target.appendChild(selectedFigure);
                removeCellsHighlighting(selectedFigure);
                selectedFigure = null;
            }
        }
    });

    [].forEach.call(figuresContainers, function(figuresBlock) {
        figuresBlock.addEventListener("click", function(e) {
            if(e.target.nodeName === "SPAN") {
                if(selectedFigure === e.target) {
                    removeCellsHighlighting(selectedFigure);
                    removeFigureHighlighting(selectedFigure);
                    selectedFigure = null;
                } else {
                    if(selectedFigure) {
                        removeFigureHighlighting(selectedFigure);
                        if(selectedFigure.getAttribute(DATA_ATTR_NAME) !== e.target.getAttribute(DATA_ATTR_NAME)) {
                            removeCellsHighlighting(selectedFigure);
                        }
                    }
                    selectedFigure = e.target;
                    highlightCells(selectedFigure);
                    highlightFigure(selectedFigure);
                }
            }
        });
    });

    function highlightCells(figure) {
        var cellsToHighLight = table.querySelectorAll("td[".concat(DATA_ATTR_NAME, "='", figure.getAttribute(DATA_ATTR_NAME), "']"));
        [].forEach.call(cellsToHighLight, function(cell) {
            if(cell.className.indexOf(HIGHLIGHTED_CELL_CLASS_NAME) === -1 && cell.children.length === 0) {
                cell.className = cell.className.concat(" ", HIGHLIGHTED_CELL_CLASS_NAME);
            }
        });
    }

    function removeCellsHighlighting(figure) {
        var cellsToClear = table.querySelectorAll("td[".concat(DATA_ATTR_NAME, "='", figure.getAttribute(DATA_ATTR_NAME), "']"));
        var reg = new RegExp(" " + HIGHLIGHTED_CELL_CLASS_NAME, "g");
        [].forEach.call(cellsToClear, function(cell) {
            cell.className = cell.className.replace(reg, "");
        });
    }

    function highlightFigure(figure) {
        if(figure.className.indexOf(SELECTED_FIGURE_CLASS_NAME) === -1) {
            figure.className = figure.className.concat(" ", SELECTED_FIGURE_CLASS_NAME);
        }
    }

    function removeFigureHighlighting(figure) {
        var reg = new RegExp(" " + SELECTED_FIGURE_CLASS_NAME, "g");
        figure.className = figure.className.replace(reg, "");
    }
})();