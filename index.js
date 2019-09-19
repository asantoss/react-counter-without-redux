
class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {value: this.props.counterValue}
    }
    addToValue =(e)=>{
        this.setState({...this.state, value: this.state.value + 1})
    }
    subtractFromValue =(e) =>{
        if(this.state.value){
            this.setState({...this.state, value: this.state.value - 1})
        }
    }

    addFive = (e)=>{
        this.setState({...this.state, value: this.state.value + 5})
    }
    subtractFive = (e)=>{
        if(this.state.value){
            this.setState({...this.state, value: this.state.value - 5})
        }
    }
    render() {
        return (
            <div>
            <h1 className="count">{this.state.value}</h1>
            <button onClick={this.addToValue}>+</button>
            <button onClick={this.subtractFromValue}>-</button>
            <button onClick={this.addFive}>+ 5</button>
            <button onClick={this.subtractFive}>- 5</button>
            </div>
        )
    }
}


 function FnCounter(props) {
     const {counterValue}= props
    // const [value, setValue] = React.useState(counterValue);

    //   React.useEffect( ()=>{
    //    fetch('https://dog.ceo/api/breeds/list/all').then(res => res.json()).then(console.log)
    //   })
    return (
        <div>
        <div>
            <h1 className="count">{value}</h1>
            <button onClick={()=> setValue(value + 1)}>+</button>
            <button onClick={()=> setValue(value ? value-1 : value)}>-</button>
            <button onClick={()=> setValue(value + 5)}>+ 5</button>
            <button onClick={()=> setValue(value ? value-5 : value)}>- 5</button>
            </div>
        </div>
    )
}


const App = (props)=>{
    const [counters, setCounters] = React.useState([]);
    
    const countersHTML = counters.map((counter, i) =>{
        return (<div key={i}>
            <Counter counterValue={counter.value}/>
            <button onClick={()=>setCounters([...counters.slice(0, i), ...counters.slice(i+1)])}>Remove Counter</button>
            </div>)
    })
    return(
        <div className="app">
            {countersHTML}
        <button onClick={()=>setCounters([...counters, {value: 0, id: Math.floor(Math.random() * counters.length)}])} >Add Counter</button>
        
        </div>
    )
}

// <FnCounter counterValue={counter.value} />


ReactDOM.render(<div><App/></div>, document.getElementById('root'))



