//import Chart from 'chart.js/auto'
console.log("hi");  
const vtabs = document.getElementById("voltage_tabs");
const therms = document.getElementById("thermistors");
const generic_data = {  
        datasets: [{
            label: "# of Votes",
            data: [{x:1, y:1}, {x:3, y:5}, {x:5, y:13}]
          },
        {
            label: "# of Votes",
            data: [{x:1, y:1}, {x:3, y:5}, {x:5, y:13}]
          }]
      };
let elements = [vtabs,therms];
let loops = [false,false,false]
let volt_chart;
let temp_chart;
let counter =2;
let rows;
fetch('sin_of_x.csv')
  .then(response => response.text()) // Read the file as text
  .then(csv => {
    console.log("Raw CSV Data:");
    //console.log(csv); // Logs the raw CSV data as a string

    // Convert CSV string to an array of rows
    rows = csv.split("\n").map(row => row.split(","));

    console.log("Parsed Data (Array of Arrays):");
    console.log(rows);
  })
  .catch(error => console.error('Error loading the CSV file:', error));

function clear_page(){
    for (i in elements){
        elements[i].style.display = "none";
    }
    for (i in loops){
      loops[i] = false;
    }
}
function parse_data([time,values]){
  var points = [];
  for (let i = 0; i< time.length; i++){
    var x;
    var y;
    points[i] = {x: time.at(i),y: values.at(i)};
  }
  return points;
}
function set_date_frame(r,l, offset = 0){
  let x = [],y = [];
  for(let i = counter, j = 0; i< counter+l;i++,j++){
     x[j] = r[i][0];
     y[j] = parseFloat(r[i][1])+offset;
  }
  counter +=1;
  return [x,y];
}

function show_elements(lis){
    for (i in lis){
        elements[lis[i]].style.display = "block";
    }
}
console.log("sample data set");
console.log(set_date_frame(10));
function AMS_Page(){
    //clear_page();
    show_elements([0,1]);
    loops[0] = true;
    voltage_data = generic_data;
    voltage_data["datasets"][0]["label"] = "Voltage Tap1";
    voltage_data["datasets"][0]["data"] = parse_data(set_date_frame(rows,100));
    voltage_data["datasets"][1]["label"] = "Voltage Tap2";
    voltage_data["datasets"][1]["data"] = parse_data(set_date_frame(rows,100,1));
    volt_chart = new Chart(vtabs, {
        type: "line",
        data: voltage_data,
        options: {
          scales: {
            x: {
              type:"linear"
            }
          },
          fill: true,
          backgroundColor1: 'rgba(59, 59, 236, 0.54)'
        }
      }
    );
    temp_chart = new Chart(therms, {
      type: "line",
      data: {
        labels: [1,2,3,4,5,6],  
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        backgroundColor:'rgba(44, 181, 32, 0.54)',
        fill: true,
        pointHoverRadius:10  
      },
    });
    if (loops[0]){
      setInterval(() =>{
        volt_chart.data.datasets[0].data = parse_data(set_date_frame(rows,100));
        volt_chart.data.datasets[1].data = parse_data(set_date_frame(rows,100,1));

        volt_chart.update("none");
      },50);
    }
}

function MC_Page(){
    clear_page();
}

function COOLING_Page(){
    clear_page();
}
