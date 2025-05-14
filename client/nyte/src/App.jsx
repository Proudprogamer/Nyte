import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function App() {
  const [createdRoom, setCreatedRoom] = useState();
  const [joinRoom, setJoinRoom] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function roomCreator() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setCreatedRoom(result);
  }

  async function roomJoiner() {
    console.log('user wants to join', joinRoom);
    if (joinRoom.length < 6)
      setError(true);
    else {
      navigate(`/chat-room?room=${joinRoom}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Nyte</h1>
          
          <div className="w-full space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 block">Join an existing room</label>
              {error && <p className="text-red-500 text-sm font-medium">Please enter a valid Room ID (at least 6 characters)</p>}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input 
                  onChange={(e) => {
                    setJoinRoom(e.target.value);
                    if (error) setError(false);
                  }} 
                  className="border border-gray-700 bg-gray-900 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter Room ID"
                />
                <button 
                  onClick={() => roomJoiner()} 
                  className="bg-black hover:bg-gray-950 text-white rounded-lg py-2 px-6 font-medium transition-colors duration-200 sm:w-auto w-full"
                >
                  Join
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">or</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 block">Create a new room</label>
              <button 
                onClick={() => roomCreator()} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3 font-medium transition-all duration-200"
              >
                Create New Room
              </button>
              
              {createdRoom && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Your Room ID:</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-400">{createdRoom}</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(createdRoom)}
                      className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;