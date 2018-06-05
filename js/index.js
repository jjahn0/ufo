// index.js - functions to render table and handle form submissions

var $tbody = document.querySelector("tbody");
var $pages = document.querySelector("#pages");

var $stateSearch = document.querySelector("#state_search");
var $searchBtn = document.querySelector("#search");
var $clearBtn = document.querySelector("#clear");


d3.select("#search").on("click", function(event){ advancedSearch() });

$clearBtn.addEventListener("click", resetClick);

d3.select("#submit").on("click", function(event){ submitClickEvent() });

var $ = function (selector) {
    return document.querySelector(selector);
};

function initTable(page, inputDB){
    var lastPage = Math.ceil(inputDB.length/10);
    var floor = (Math.floor(page/10))*10;
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
    

    renderTable(page*10, inputDB);
}


function renderTable(dataIndex, db){
    $tbody.innerHTML = "";
    for (var i=dataIndex; i<db.length && i<(dataIndex+10); i++){
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

function handleSearch(){
    var filterState = $stateSearch.value.trim().toLowerCase();
    result = dataSet.filter(sighting => sighting.state.toLowerCase() === filterState);
    initTable(0, result);
}

function submitClickEvent(event){
    var entry = {
        datetime: document.getElementById("datetime").value,
        city: document.getElementById("city").value.toLowerCase(),
        state: document.getElementById("state").value.toLowerCase(),
        country: document.getElementById("country").value.toLowerCase(),
        shape: document.getElementById("shape").value.toLowerCase(),
        durationMinutes: document.getElementById("duration").value,
        comments: document.getElementById("comments").value
    };
    console.log(entry);
    dataSet.unshift(entry);
    initTable(0, dataSet.filter(dataSet => dataSet.city === entry.city));
}
  
function resetClick(event){
    event.preventDefault();
    initTable(0, dataSet);
}
    
    

function advancedSearch (event){

    var results = dataSet;
    var dateTimeSearch = document.getElementById("datetime").value.trim().toLowerCase();
    var citySearch = document.getElementById("city_search").value.trim().toLowerCase();
    var stateSearch = document.getElementById("state_search").value.trim().toLowerCase();
    var countrySearch = document.getElementById("country_search").value.trim().toLowerCase();
    var shapeSearch = document.getElementById("shape_search").value.trim().toLowerCase();
    

    if (dateTimeSearch !== ''){
        results = results.filter(results => results.state.trim().toLowerCase() === stateSearch);
        dateTimeSearch='';
    }
    if (citySearch !== ''){
        results = results.filter(results => results.city.trim().toLowerCase() === citySearch);
        citySearch='';
    }
    if (stateSearch !== ''){
        results = results.filter(results => results.state.trim().toLowerCase() === stateSearch);
        stateSearch = '';
    }
    if (countrySearch !== ''){
        results = results.filter(results => results.country.trim().toLowerCase() === countrySearch);
        countrySearch = '';
    }
    if (shapeSearch !== ''){
        results = results.filter(results => results.shape.trim().toLowerCase() === shapeSearch);
        shapeSearch = '';
    }
    
    initTable(0, results);
}

initTable(0, dataSet);
