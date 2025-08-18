import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => <p>{text} {value}</p>;

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const average = total === 0 ? 0 : (good - bad) / total; // return 0 if total is 0 else calculate average
  const positive = total === 0 ? 0 : (good / total) * 100; // return 0 if total is 0 else calculate positive percentage
  
  return (
    <div>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={total} />
      <StatisticsLine text="Average" value={average} />
      <StatisticsLine text="Positive" value={`${positive} %`} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

export default App