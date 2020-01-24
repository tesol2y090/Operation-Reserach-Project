import React, { useContext }  from 'react';
import { Divider, Header, Form, Button } from 'semantic-ui-react'

// import { dataContext } from '../App.js'
import { dataContext, isRenderContext, abContext } from './Store.js'

import * as tf from '@tensorflow/tfjs'



const Inputform = () => {

    const [data, setData] = useContext(dataContext)
    const [isRender, setIsRender] = useContext(isRenderContext)
    const [ab, setAb] = useContext(abContext)

    function handleClick(e) {
        const data = e.target.textdata.value
        setData(data)
        createModel(data)
    }

    function createModel(dataUse) {
        let ys = prepData(dataUse)
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
        setAb([a.dataSync()[0], b.dataSync()[0]])
    }

    function prepData(data) {
        let dataprep = data.split("\n").map(function(item) {
            return parseInt(item, 10);
            })
        return dataprep
    }

    return (
    <React.Fragment>
        <Header as='h3'>Input data</Header>
        <Form onSubmit={(e) => handleClick(e)}>
            <Form.Field control='textarea' rows='20' id="textdata"/>
            <Button.Group>
                <Button positive>Save</Button>
                <Button.Or />
                <Button>Cancel</Button>
            </Button.Group>
        </Form>
        <Divider section />
    </React.Fragment>
    )
}

export default Inputform;