var $tbody = document.querySelector("tbody");
var $pages = document.querySelector("#pages");

var displayPerPage = 50;

function initTable(page, inputDB){
    var lastPage = Math.ceil(inputDB.length/displayPerPage);
    var floor = (Math.floor(page/displayPerPage))*displayPerPage;
    console.log("floor:" + floor);
    console.log("last page: " + lastPage);

    $pages.innerHTML = "";
    d3.select(".pagination").append("li").text(" [ page "+ (page+1) + " of " + lastPage +']');
    if (page > 0){
        d3.select(".pagination").append("li")
                            .attr("class", "page-item")
                            .append("a")
                            .attr("class", "page-link")
                            .attr("href", "#")
                            .on("click", function(){initTable(page-1, inputDB); return false;})
                            .text("<<");
    }
    else {
        d3.select(".pagination").append("li")
                            .attr("class", "page-item")
                            .append("a")
                            .attr("class", "page-link")
                            .attr("href", "#")
                            .text("<<");
    }
    

    d3.select(".pagination").append("li")
                                    .attr("class", "page-item active")
                                    .append('a')
                                    .attr('class', 'page-link')
                                    .attr('href', '#')
                                    .text(page+1);
    if (page < lastPage){
        d3.select(".pagination").append("li")
                            .append("a")
                            .attr("class", "page-link")
                            .attr("href", "#")
                            .on("click", function(){initTable(page+1, inputDB); return false;})
                            .text(">>");
    }
    else{
        d3.select(".pagination").append("li")
                            .append("a")
                            .attr("class", "page-link")
                            .attr("href", "#")
                            .text(">>");
    }
    

    renderTable(page*20, inputDB);
}


function renderTable(dataIndex, db){
    $tbody.innerHTML = "";
    for (var i=dataIndex; i<db.length && i<(dataIndex+displayPerPage); i++){
        var sighting = db[i];
        var fields = Object.keys(sighting);
        var $row = $tbody.insertRow(i-dataIndex);
        for (var j=0; j<fields.length; j++){
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
        }
    }
}

initTable(0, dataSet);