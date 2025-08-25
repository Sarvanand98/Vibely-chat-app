import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { getAiHelp, sendHelp } from '../lib/api'

const AiPage = () => {
  const queryClient = useQueryClient()
  const authUser = useAuthUser()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]);

  const { data: chatdata, isLoading } = useQuery({
    queryKey: ["Ai"],
    queryFn: getAiHelp,
    enabled: !!authUser
  })

  const { mutate: sendAihelp, isPending } = useMutation({
    mutationFn: sendHelp,
    onSuccess: (aiReply) => {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: input },
        { role: 'ai', content: aiReply }
      ]);
      setInput('');
    }
  })

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendAihelp({ prompt: input })
  }

  return (
    <div className='h-[91vh] bg-base-300 flex flex-col'>
      <div className='flex-1 flex flex-col items-center bg-base-200 relative'>
        <h2 className='sticky top-0 flex bg-base-200 w-full justify-center items-center py-3 '>AI - ASSISTANCE</h2>
        
        <div className='w-full max-w-xl space-y-4 mb-6 overflow-y-auto flex-1 px-2 py-4 flex flex-col' style={{ paddingBottom: '10px' }}>
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`inline-block px-4 py-2 rounded-2xl shadow 
                ${msg.role === 'user'
                  ? 'bg-primary text-white self-end'
                  : 'bg-base-100 text-base-content self-start'
                }`}
              style={{
                maxWidth: '70%',
                wordBreak: 'break-word',
                textAlign: msg.role === 'user' ? 'right' : 'left',
                marginLeft: msg.role === 'user' ? 'auto' : undefined,
                marginRight: msg.role === 'ai' ? 'auto' : undefined,
              }}
            >
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <form
          className=' flex gap-2 w-full  max-w-xl px-2 py-4 bg-base-100  left-1/2 -translate-x-1/2 rounded-2xl ml-2 sticky bottom-0'
          onSubmit={handleSend}
        >
          <input
            type="text"
            className='input input-bordered w-full'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isPending}
          />
          <button className='btn btn-primary' type="submit" disabled={isPending || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default AiPage