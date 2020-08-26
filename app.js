// Read In Json
d3.json("samples.json").then((importedData) => {
    var data = importedData
    var options = data.names
    // console.log(options)

    // Put names array into dropdown list
    var select = document.getElementById("selDataset");

    for (var i = 0; i < options.length; i++) {
        var opt = options[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        // select.add(el);
        select.appendChild(el);
    };
});


// Function called by DOM changes
function optionChanged(subject) {

    // console.log(subject);

    // Call function to update the Demographics
    updateDemo(subject);

    // Call function to update the Bar Graph
    updateBar(subject);

    // Call function to update the Bubble Graph
    updateBubble(subject);
};


function updateDemo(subject) {

    // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as incomingData
    d3.json("samples.json").then((incomingData) => {
        // console.log(incomingData)

        var subDemo = incomingData.metadata.filter(meta => meta.id == subject);
        // console.log(subDemo)  
        var myString = JSON.stringify(subDemo, null, 2);
        JSON.parse(myString);
        myString = myString.replace("[", "").replace("\"", "").replace("]", "").replace("{", "").replace("}", "");

        document.getElementById("sample-metadata").innerHTML = myString;

    });

}


function updateBar(subject) {
    // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as incomingData
    d3.json("samples.json").then((incomingData) => {

        //  This filters to selected dropdown item - keep
        var sampleData = incomingData.samples.filter(samp => samp.id == subject)[0];
        console.log(sampleData);

        var otuID = sampleData.otu_ids
        var otuLabel = sampleData.otu_labels
        var otuValues = sampleData.sample_values



        // Sort the data by sample values
        // var sortedByvalues = sampleData.sort((a, b) => b.otuValues - a.otuValues);

        // Slice the first 10 objects for plotting
        sliceID = otuID.slice(0, 10);
        stringID = sliceID.map(String)

        console.log(stringID)

        sliceLabel = otuLabel.slice(0, 10);

        console.log(sliceLabel)

        sliceValues = otuValues.slice(0, 10);

        console.log(sliceValues)

        // Reverse the array to accommodate Plotly's defaults
        // reversedData = slicedData.reverse();

        // Trace1 for the data
        var trace1 = {
            x: sliceValues,
            y: stringID,
            text: sliceLabel,
            name: "OTU",
            type: "bar",
            orientation: "h"
        };

      

        // // // data
        var data = [trace1];

        // // Apply the group bar mode to the layout
        var layout = {
            title: "Top Ten OTUs",
            
           
        };

        // // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data, layout);





    });



}

function updateBubble(subject) {
   // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as incomingData
    d3.json("samples.json").then((incomingData) => {

        //  This filters to selected dropdown item - keep
        var sampleData = incomingData.samples.filter(samp => samp.id == subject)[0];
        console.log(sampleData);

        var otuID = sampleData.otu_ids
        var otuLabel = sampleData.otu_labels
        var otuValues = sampleData.sample_values



        // Sort the data by sample values
        // var sortedByvalues = sampleData.sort((a, b) => b.otuValues - a.otuValues);

        // Slice the first 10 objects for plotting
        sliceID = otuID.slice(0, 10);
        stringID = sliceID.map(String)

        // console.log(stringID)

        sliceLabel = otuLabel.slice(0, 10);

        // console.log(sliceLabel)

        sliceValues = otuValues.slice(0, 10);

        // console.log(sliceValues)

        // Reverse the array to accommodate Plotly's defaults
        // reversedData = slicedData.reverse();

        // Trace1 for the data
        var trace1 = {
            x: stringID,
            y: sliceValues,
            text: sliceLabel,
            name: "OTU",
            mode: "markers",
            marker: {
                color: ['#B98A8A', '#908AB9', '#4EBF7F', '#89F908', '#F7CB1A', '#FF66B2', '#54627A', '#E2451E', '#176F38', '#17436F'],
                size: (sliceValues *1000)

            }
        };

              // // // data
        var data = [trace1];

        // // Apply the group bar mode to the layout
        var layout = {
            title: "Test Subject Data",
            height: 600,
            width: 600
           
        };

        // // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data, layout);





    });





}



// Create init function upon page load to display data
    // pick first value




