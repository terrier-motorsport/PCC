//import Chart from 'chart.js/auto'

const vtabs_chart = document.getElementById("voltage_tabs");
const therms_chart = document.getElementById("thermistors");

let elements = [vtabs_chart,therms_chart];

function clear_page(){
    for (i in elements){
        elements[i].style.display = "none";
    }
}

function show_elements(lis){
    for (i in lis){
        elements[lis[i]].style.display = "block";
    }
}

function AMS_Page(){
    //clear_page();
    show_elements([0,1]);
    new Chart(vtabs_chart, {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
    });
    temp_chart = new Chart(therms_chart, {
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
}

function MC_Page(){
    clear_page();
}

function COOLING_Page(){
    clear_page();
}
