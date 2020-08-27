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


// Display the default plot
function init() {

    // Trace1 for the data
    var trace1 = {
        x: "",
        y: "",
        text: "",
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    var layout = {
        title: "Top Ten OTUs",
        xaxis: { title: "Sample Values" },
        height: 600,
        width: 800
    };

    Plotly.newPlot("bar", data, layout);

    var trace2 = {
        x: "",
        y: "",
        text: "",
        name: "OTU",
        mode: "markers",
        marker: {
           
        }
    };

    // // // data
    var data2 = [trace2];

    // // Apply the group bar mode to the layout
    var layout = {
        title: "Test Subject Data",
        height: 600,
        width: 1000,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };

    // // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data2, layout);


}


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

        var demobody = d3.select("#sample-metadata");

        demobody.html("")
        var subDemo = incomingData.metadata.filter(meta => meta.id == subject)[0];
        console.log(subDemo)

        
        Object.entries(subDemo).forEach(([key, value]) => {
            demobody.append("p").text(`${key}:${value}`);
          
        });

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

        // Slice the first 10 objects for plotting
        var sliceID = otuID.slice(0, 10).reverse();
        // convert to string and add OTU
        var stringID = sliceID.map(id => `OTU ID ${id}`);


        var sliceLabel = otuLabel.slice(0, 10).reverse();

        var sliceValues = otuValues.slice(0, 10).reverse();
      
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
            xaxis: { title: "Sample Values" }

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


        // Trace1 for the data
        var trace2 = {
            x: otuID,
            y: otuValues,
            text: otuLabel,
            name: "OTU",
            mode: "markers",
            marker: {
                color: otuID,
                size: otuValues

            }
        };

        // // // data
        var data = [trace2];

        // // Apply the group bar mode to the layout
        var layout = {
            title: "Test Subject Data",
            height: 600,
            width: 1000,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        // // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data, layout);


    });


};


init();


