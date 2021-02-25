import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = (props) => {

  const type = props.type
  const statState = props.statState
  if (type === "Good" || type === "Poor" || type === "Neutral") {
    return (
      <tr>
        <td> {type} </td>
        <td>{statState}</td>
      </tr>
    )

  } else if (type == 'Average') {
    return (
      <tr>
        <td> {type} </td>
        <td> {((statState.good - statState.poor) / statState.all).toFixed(1)}</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{type}</td>
        <td>{(statState.good / statState.all * 100).toFixed(1)} %</td>
      </tr>
    )
  }

}

const Statistics = (props) => {
  const currentState = props.currentState
  return (

    <div>
      <table>
        <tbody>
          <Statistic type="Good" statState={currentState.good} />
          <Statistic type="Neutral" statState={currentState.neutral} />
          <Statistic type="Poor" statState={currentState.poor} />
          <Statistic type="Average" statState={currentState} />
          <Statistic type="Positive" statState={currentState} />
        </tbody>
      </table>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      poor: 0,
      all: 0
    }
  }
  ClickGood = () => {
    this.setState({
      good: this.state.good + 1,
      all: this.state.all + 1
    })
  }
  ClickNeutral = () => {
    this.setState({
      neutral: this.state.neutral + 1,
      all: this.state.all + 1
    })
  }
  ClickPoor = () => {
    this.setState({
      poor: this.state.poor + 1,
      all: this.state.all + 1
    })
  }

  render() {
    const stat = () => {
      if (this.state.all === 0) {
        return (
          <div>
            <em>the application is operated by pressing the buttons repeatedly</em>
          </div>
        )
      }
      return (
        <div>
          <Header title={'Statistics'} />
          <Statistics currentState={this.state} />
        </div>
      )
    }
    return (
      <div>
        <Header title={'Give feedback'} />

        <div>
          <Button
            handleClick={this.ClickGood}
            text="Good"
          />
          <Button
            handleClick={this.ClickNeutral}
            text="Neutral"
          />
          <Button
            handleClick={this.ClickPoor}
            text="Poor"
          />
        </div>

        {stat()}

      </div >
    )

  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

