
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: this.props.counterValue }
    }
    addToValue = (e) => {
        this.props.setValue(this.props.counterValue + 1, this.props.counterIndex)
    }
    subtractFromValue = (e) => {
        if (this.state.value) {
            this.props.setValue(this.props.counterValue - 1, this.props.counterIndex)
        }
    }

    addFive = (e) => {
        this.props.setValue(this.props.counterValue + 5, this.props.counterIndex)
    }
    subtractFive = (e) => {
        if (this.props.counterValue) {
            this.props.setValue(this.props.counterValue - 5, this.props.counterIndex)
        }
    }
    render() {
        return (
            <div>
                <h1 className="count">{this.props.counterValue}</h1>
                <button onClick={this.addToValue}>+</button>
                <button onClick={this.subtractFromValue}>-</button>
                <button onClick={this.addFive}>+ 5</button>
                <button onClick={this.subtractFive}>- 5</button>
                <button onClick={() => { this.props.removeCounter(this.props.counterId) }}>Remove Counter</button>
            </div>
        )
    }
}


function FnCounter(props) {
    const { counterValue } = props
    const [value, setValue] = React.useState(0);
    return (
        <div>
            <div>
                <h1 className="count">{value}</h1>
                <button onClick={() => setValue(value + 1)}>+</button>
                <button onClick={() => setValue(value ? value - 1 : value)}>-</button>
                <button onClick={() => setValue(value + 5)}>+ 5</button>
                <button onClick={() => setValue(value ? value - 5 : value)}>- 5</button>
            </div>
        </div>
    )
}
function Timer(props) {
    const { counterValue } = props
    const [value, setValue] = React.useState(0);
    const [delay, setDelay] = React.useState(1000)

    React.useEffect(() => {
        const timer = setInterval(() => setValue(value + 1), delay)
        return () => clearInterval(timer)
    }, [value, delay])
    return (
        <div>
            <div>
                <h1 className="count">{value}</h1>
                <form action="" onSubmit={(e) => { e.preventDefault(); setDelay(e.target.elements[0].value) }}>
                    <label htmlFor="delay">Change Delay
                    <input type="number" />
                    </label>
                </form>
            </div>
        </div >
    )
}

const App = (props) => {
    const [counters, setCounters] = React.useState([]);

    const countersHTML = counters.map((counter, i) => {
        return (<div key={i} id={i}>
            <Counter counterValue={counter.value} />
            <button id={i} onClick={(e) => {
                console.log(e.target);
                setCounters(counters.filter((element, ind) => i != ind))
            }}>Remove Counter</button>
        </div>)
    })
    return (
        <div className="app">
            {countersHTML}
            <button onClick={(e) => setCounters([...counters, { value: 0 }])} >Add Counter</button>

        </div>
    )
}



class AppClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: []
        }
    }
    addCounter = (e) => {
        this.setState({
            ...this.state, counters: [...this.state.counters, {
                value: 0, id: this.state.counters.reduce((acc, curr) => {
                    return curr.id > acc ? curr.id : acc
                }, 0) + 1
            }]
        })
    }
    removeCounter = (id) => {
        // console.log(id, [...this.state.counters.slice(0, id), ...this.state.counters.slice(id + 1)])
        this.setState({
            counters: [...this.state.counters.filter(counter => counter.id !== id)]
        })
    }

    setValue = (value, id) => {
        const newState = { ...this.state };
        newState.counters[id] = { ...newState.counters[id], value: value }
        this.setState(newState)
    }
    render() {
        const countersHTML = this.state.counters.map((counter, i) => {
            return (<div key={i} id={i}>
                <Counter counterIndex={i} counterId={counter.id} counterValue={counter.value} removeCounter={this.removeCounter} setValue={this.setValue} />
            </div>)
        })
        return (
            <div className="app">
                {countersHTML}
                <button onClick={this.addCounter} >Add Counter</button>
            </div>
        )
    }
}



// <FnCounter counterValue={counter.value} />


ReactDOM.render(<div><AppClass /> <Timer /></div>, document.getElementById('root'))



