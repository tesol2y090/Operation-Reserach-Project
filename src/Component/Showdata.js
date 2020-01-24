import React, { useContext } from 'react';
import { Divider, Header, Form, Button } from 'semantic-ui-react'
import * as d3 from 'd3'

// import { dataContext } from '../App.js'
import Store, { dataContext } from './Store.js'

import ShowPredict from './ShowPredict'
import SelectDate from './SelectDate.js'

const Showdata = () => {

    const [data, setData] = useContext(dataContext)

    function prepData(data) {
        let dataprep = data.split("\n").map(function(item) {
            return parseInt(item, 10);
            })
        return dataprep
    }

    function createScatterPlot() {

        if(data === 'emthy') {

        } else {
            const dataShow = prepData(data)
            let margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

            let svg = d3.select(".my_dataviz")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            let x = d3.scaleLinear()
                      .domain([0, dataShow.length])
                      .range([ 0, width ]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            let y = d3.scaleLinear()
                    .domain([0, Math.max(...dataShow)])
                    .range([ height, 0]);

            svg.append("g")
                .call(d3.axisLeft(y));
            
            svg.append("g")
                .selectAll("dot")
                .data(dataShow)
                .enter()
                .append("circle")
                .attr("cx", function (d, i) { return x(i + 1); } )
                .attr("cy", function (d) { return y(d); } )
                .attr("r", 2)
                .style("fill", "#69b3a2")
        }
    }

    return (
        <React.Fragment>
            <Header as='h3'>Scatter plot</Header>
                {createScatterPlot()}
                <div className="my_dataviz"></div>
            <Divider section />
            <Header as='h3'>Predict plot</Header>
                <ShowPredict />
            <Divider section />
            <Header as='h3'>Select Days</Header>
                <SelectDate />
            <Divider section />
        </React.Fragment>
    )
}

export default Showdata;