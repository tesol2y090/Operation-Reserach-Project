import React, { useContext, useState }from 'react';
import { Button, Form, Header } from 'semantic-ui-react'

import { abContext } from './Store.js'

const SelectDate = () => {

    const [ab, _] = useContext(abContext)
    const [zStar, setZstar] = useState(0)
    const [tc, setTc] = useState(0)
    const [datePredict, setDatePredict] = useState(0)
    const [pricePredict, setPricePredict] = useState(0)
    const a = ab[0]
    const b = ab[1]
    
    function handbleSubmit(e) {
        const date = e.target.date.value
        const c1 = e.target.c1.value
        const c2 = e.target.c2.value

        const lambda = date*a + b
        let zUse = Math.sqrt((2*c1*lambda)/c2)
        setZstar(Math.floor(Math.sqrt((2*c1*lambda)/c2)))
        setTc(Math.floor((c2*(zUse/2)) + (c1*(lambda/zUse))))
        setDatePredict(date)
        setPricePredict(Math.floor(date*a + b))

    }

    return (
        <div>
            <Form onSubmit={(e) => handbleSubmit(e)}>
                <Form.Field>
                    <label>Select Date</label>
                    <input id="date"/>
                </Form.Field>
                <Form.Field>
                    <label>C1</label>
                    <input id="c1"/>
                </Form.Field>
                <Form.Field>
                    <label>C2</label>
                    <input id="c2"/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
            <Header as='h2'>Month {datePredict} = {pricePredict} unit</Header>
            <Header as='h2'>Z* = {zStar} unit</Header>
            <Header as='h2'>Total cost = {tc} baht</Header>
        </div>
    )
}

export default SelectDate;