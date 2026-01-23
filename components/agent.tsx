"use client";

import Image from "next/image";
import { useState } from "react";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
}

const Agent = ({ userName }: AgentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isSpeaking = true;

  const handleCall = () => {
    setCallStatus(CallStatus.CONNECTING);
    // Simulate connection
    setTimeout(() => {
      setCallStatus(CallStatus.ACTIVE);
    }, 2000);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="card-border">
            <div className="card-content">
              <div className="avatar">
                {isSpeaking && <span className="animate-speak" />}
                <Image 
                  src="/ai-avatar.png" 
                  alt="AI Interviewer" 
                  width={65} 
                  height={54} 
                  className="object-cover"
                />
              </div>
              <h3 className="text-white text-xl">AI Interviewer</h3>
            </div>
          </div>
        </div>

        <div className="card-border hidden md:block">
          <div className="card-content">
            <div className="avatar">
              <Image 
                src="/user-avatar.png" 
                alt={userName} 
                width={120} 
                height={120} 
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-white text-xl">{userName}</h3>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        {callStatus === 'ACTIVE' ? (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        ) : (
          <button className="btn-call relative" onClick={handleCall}>
            <span>
              {callStatus === 'INACTIVE' || callStatus === 'FINISHED' 
                ? 'Call' 
                : '. . .'}
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;