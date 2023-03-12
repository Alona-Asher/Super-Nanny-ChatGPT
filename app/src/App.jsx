import { ChatBox } from './ChatBox'
import supermom from './images/supermom.png';

function App() {
  return (
    <div className="App">
      <div class="header">
        <h1 style={{color: 'dark blue'}}>Super Nanny Chatbot</h1>
        <h3 style={{color: 'red'}}>An artificial nanny powered by ChatGPT</h3>
        <img style={{ position: "relative", height: "100px", width: "100px"}} src={supermom}/>
      </div> 
      <ChatBox />
    </div>
  )
}

export default App
