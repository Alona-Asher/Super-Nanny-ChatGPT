import { ChatBox } from './ChatBox'
import './App.css';
import supermom from './images/supermom.png';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="header-title">
          <h2>Super Nanny Chatbot</h2>
        </div>
        <div className="header-subtitle">
          <h3>An artificial nanny powered by ChatGPT</h3>
          <img className="logo1" src={supermom} alt="logo" />
        </div>
      </div> 
      <ChatBox />
    </div>
  )
}

export default App
