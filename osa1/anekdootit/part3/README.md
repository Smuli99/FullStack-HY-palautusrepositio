# Anekdootit

## Tehtävien 1.12 - 1.14 vastaukset

Kokonaisuudessa 1.14 vastaus muut jätetty pois.

main.jsx
```
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
App.jsx
```
import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Content = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const MostVotes = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  if (maxVotes === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <div>
      <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const anecdotesHandler = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const votesHandler = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Content anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={votesHandler} text="Vote" />
      <Button onClick={anecdotesHandler} text="Next Anecdote" />
      <Header text="Anecdote with most votes" />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App
```
