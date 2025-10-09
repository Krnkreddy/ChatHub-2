import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  Search,
  Settings,
  Plus,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const platforms = [
  { id: "all", name: "All Messages", color: "primary" },
  { id: "whatsapp", name: "WhatsApp", color: "whatsapp" },
  { id: "telegram", name: "Telegram", color: "telegram" },
  { id: "messenger", name: "Messenger", color: "messenger" },
  { id: "discord", name: "Discord", color: "discord" },
];

const mockConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    platform: "whatsapp",
    lastMessage: "Hey! Are we still on for tomorrow?",
    time: "2m ago",
    unread: 2,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Tech Team",
    platform: "telegram",
    lastMessage: "The new feature is ready for testing",
    time: "15m ago",
    unread: 0,
    avatar: "TT",
  },
  {
    id: 3,
    name: "Mike Chen",
    platform: "messenger",
    lastMessage: "Thanks for your help!",
    time: "1h ago",
    unread: 1,
    avatar: "MC",
  },
  {
    id: 4,
    name: "Design Squad",
    platform: "discord",
    lastMessage: "Check out the new mockups",
    time: "2h ago",
    unread: 5,
    avatar: "DS",
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hey! Are we still on for tomorrow?",
    time: "10:32 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Yes! Looking forward to it 😊",
    time: "10:33 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "Great! See you at 3 PM then",
    time: "10:35 AM",
    isOwn: false,
  },
];

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Handle message send
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">ChatHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Platform Filters */}
        <aside className="w-20 border-r border-border bg-card flex flex-col items-center py-6 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                selectedPlatform === platform.id
                  ? "gradient-primary shadow-glow"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
              title={platform.name}
            >
              <MessageSquare
                className={`w-5 h-5 ${
                  selectedPlatform === platform.id ? "text-white" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
          <div className="flex-1" />
          <Button size="icon" variant="ghost" className="rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </aside>

        {/* Conversations List */}
        <aside className="w-80 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-3 rounded-lg flex items-start gap-3 transition-colors ${
                    selectedConversation.id === conv.id
                      ? "bg-accent"
                      : "hover:bg-secondary"
                  }`}
                >
                  <Avatar>
                    <AvatarFallback className={`bg-${conv.platform}`}>
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation.name}</h2>
                <p className="text-xs text-muted-foreground capitalize">
                  via {selectedConversation.platform}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.isOwn
                        ? "gradient-primary text-white"
                        : "bg-card shadow-card"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.isOwn ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="shadow-glow">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
