import { useEffect, useState } from 'react';
import './App.css';
import { useSquid } from '@squidcloud/react';
import '@squidcloud/ui/styles/index.css';

function App() {
  const [message, setMessage] = useState('');
  const [outgoingMessage, setOutgoingMessage] = useState('');
  const squid = useSquid();
  const queue = squid.queue<string>('test_topic');

  useEffect(() => {
    const subscription = queue.consume().subscribe(message => setMessage(message));
    return () => subscription.unsubscribe();
  }, []);

  const writeMessage = (e: React.FormEvent) => {
    e.preventDefault();
    queue.produce([outgoingMessage]).then();
    setOutgoingMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOutgoingMessage(value);
  };

  return (
    <div>
      <div>{message}</div>
      <form className="sq-card" onSubmit={writeMessage}>
        <input className="sq-input"
          name="message"
          value={outgoingMessage}
          onChange={handleInputChange}
        />
        <button className="sq-btn" type="submit">Write Message</button>
      </form>
      
    </div>
  );
}

export default App;
