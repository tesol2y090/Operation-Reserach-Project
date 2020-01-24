import React, { useContext, useEffect } from 'react';

import * as d3 from 'd3'
import * as tf from '@tensorflow/tfjs'

// import { dataContext } from '../App.js'
// import { abContext } from '../App.js'

import { dataContext, abContext } from './Store.js'

const ShowPredict = () => {
    const [data, setData] = useContext(dataContext)
    const [ab, setAb] = useContext(abContext)

    function prepData(data) {
        let dataprep = data.split("\n").map(function(item) {
            return parseInt(item, 10);
            })
        return dataprep
    }

    function createModel() {
        let ys = prepData(data)
        let xs = []
        for (let i = 0; i < ys.length; i++) {
            xs.push(i+1)
        }
        ys = tf.tensor(ys)
        xs = tf.tensor(xs)
        
        //model
        let xyBar = xs.mul(ys).mean()
        let xBar = xs.mean()
        let yBar = ys.mean()
        let xBaryBar = xBar.mul(yBar)
        let x2Bar = xs.square().mean()
        let xBar2 = xs.mean().square()
        let a, b = 0
        a = (xyBar.sub(xBaryBar)).div(x2Bar.sub(xBar2))
        b = (x2Bar.mul(yBar).sub(xBar.mul(xyBar))).div(x2Bar.sub(xBar2))

        const predictData = ((xs.mul(a)).add(b)).dataSync()
        //Draw graph
        const dataShow = prepData(data)
            let margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

            let svg = d3.select(".predict_viz")
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
            
            svg.append("path")
                .datum(predictData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                  .x(function(d, i) { return x(i + 1) })
                  .y(function(d) { return y(d) })
                  )
        
    }

    return (
            <div>
                {createModel()}
                <div className="predict_viz"></div>
            </div>
    )
}

export default ShowPredict;