import { useState } from 'react'
import './App.css'

const TIMEOUT = 3000

interface Key {
  label: string;
  chars: string[];
}

const keys: Key[][] = [
  [
    {
      label: '1',
      chars: ['1']
    },
    {
      label: '2',
      chars: ['A', 'B', 'C', '2']
    },
    {
      label: '3',
      chars: ['D', 'E', 'F', '3']
    },
  ],
  [
    {
      label: '4',
      chars: ['G', 'H', 'I', '4']
    },
    {
      label: '5',
      chars: ['J', 'K', 'L', '5']
    },
    {
      label: '6',
      chars: ['M', 'N', 'O', '6']
    },
  ],
  [
    {
      label: '7',
      chars: ['P', 'R', 'S', '7']
    },
    {
      label: '8',
      chars: ['T', 'U', 'V', '8']
    },
    {
      label: '9',
      chars: ['W', 'X', 'Y', 'Z', '9']
    },
    
  ],
  [
    {
      label: '*',
      chars: []
    },
    {
      label: '0',
      chars: [' ', '0']
    },
    {
      label: '#',
      chars: []
    }
  ],
]

function App() {
  const [timestamp, setTimestamp] = useState(new Date().getTime())
  const [currentChar, setCurrentChar] = useState('')
  const [message, setMessage] = useState('')

  const handleKeyClick = (key: Key): void => {
    const now = new Date().getTime()
    
    if (key.chars.includes(currentChar)) {
      const currentIndex = key.chars.indexOf(currentChar)
      const nextIndex = currentIndex === key.chars.length - 1 ? 0 : currentIndex + 1
      setCurrentChar(key.chars[nextIndex])
    } else {
      if (currentChar !== '') {
        setMessage(message + currentChar)
      }
      setCurrentChar(key.chars[0])
    }

    if (now - timestamp > TIMEOUT) {
      setMessage(message + currentChar)
      setCurrentChar('')
    }
    setTimestamp(now)
  }

  return (
    <>
      <div>Message: {message + currentChar}</div>
      <div>{keys.map((row, index) =>
        <div key={`row${index}`}>{
          row.map(key =>
            <button
              key={key.label}
              onClick={() => handleKeyClick(key)}
              className='key'
            >
              <div>{key.label}</div>
              <div className='chars'>{key.chars.filter(c => c !== key.label).join(' ')}</div>
            </button>
          )
        }</div>
      )}</div>
    </>
  )
}

export default App
