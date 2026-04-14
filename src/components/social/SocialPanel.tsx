import React, { useState } from 'react';
import { User, Friend, Message, AVATARS } from '@/types/anime';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, UserPlus, Share2, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialPanelProps {
  user: User;
  onSendMessage: (content: string, receiverId: string) => void;
  messages: Message[];
}

export const SocialPanel: React.FC<SocialPanelProps> = ({ user, onSendMessage, messages }) => {
  const [activeChat, setActiveChat] = useState<Friend | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (activeChat && messageText.trim()) {
      onSendMessage(messageText, activeChat.id);
      setMessageText('');
    }
  };

  const filteredMessages = messages.filter(
    m => (m.senderId === user.id && m.receiverId === activeChat?.id) || 
         (m.senderId === activeChat?.id && m.receiverId === user.id)
  );

  return (
    <div className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Friends List */}
      <div className="lg:col-span-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Friends</h2>
          <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-white gap-2">
            <UserPlus className="w-4 h-4" /> Add Friend
          </Button>
        </div>

        <div className="space-y-2">
          {user.friends.map(friend => (
            <div 
              key={friend.id}
              onClick={() => setActiveChat(friend)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${activeChat?.id === friend.id ? 'bg-red-600/20 border border-red-600/50' : 'bg-neutral-900 hover:bg-neutral-800 border border-transparent'}`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback className="bg-neutral-700">{friend.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${friend.status === 'online' ? 'bg-green-500' : 'bg-neutral-500'}`} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{friend.name}</p>
                <p className="text-neutral-400 text-xs">{friend.status === 'online' ? 'Online' : 'Last seen 2h ago'}</p>
              </div>
              <MessageSquare className="w-4 h-4 text-neutral-500" />
            </div>
          ))}
        </div>

        {/* Suggested Friends (Anime Avatars Feature) */}
        <div className="space-y-4 pt-6 border-t border-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-300">Discover Anime Fans</h3>
          <div className="grid grid-cols-2 gap-3">
            {AVATARS.map((avatar, idx) => (
              <div key={idx} className="bg-neutral-900 p-3 rounded-lg text-center space-y-2">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={avatar} />
                </Avatar>
                <p className="text-xs text-white">Fan_{idx + 100}</p>
                <Button size="sm" variant="outline" className="w-full text-[10px] h-7 border-neutral-700">Follow</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 bg-neutral-900 rounded-xl overflow-hidden flex flex-col h-[70vh] border border-neutral-800">
        {activeChat ? (
          <>
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activeChat.avatar} />
                </Avatar>
                <div>
                  <h3 className="text-white font-bold">{activeChat.name}</h3>
                  <p className="text-green-500 text-xs">Active Now</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white"><Share2 className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" onClick={() => setActiveChat(null)}><X className="w-5 h-5" /></Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <span className="text-[10px] text-neutral-500 bg-black/30 px-2 py-1 rounded-full">Today</span>
                </div>
                
                {filteredMessages.length === 0 && (
                  <div className="text-center py-20 text-neutral-500 text-sm italic">
                    Start a conversation with {activeChat.name}
                  </div>
                )}

                {filteredMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl ${msg.senderId === user.id ? 'bg-red-600 text-white rounded-tr-none' : 'bg-neutral-800 text-neutral-200 rounded-tl-none'}`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-neutral-800 bg-black/20">
              <div className="flex items-center gap-3">
                <Input 
                  placeholder={`Message ${activeChat.name}...`} 
                  className="bg-neutral-800 border-neutral-700 text-white focus:ring-red-600"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSend}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center">
              <MessageSquare className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg">Your Messages</h3>
              <p className="text-sm max-w-xs">Select a friend to start chatting or share your favorite anime with them.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};