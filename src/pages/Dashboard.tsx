import { useState, useEffect } from "react";
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
  LogOut,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { AISuggestions } from "@/components/AISuggestions";
import { formatDistanceToNow } from "date-fns";

const platforms = [
  { id: "all", name: "All Messages", icon: MessageSquare },
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare },
  { id: "telegram", name: "Telegram", icon: MessageSquare },
  { id: "messenger", name: "Messenger", icon: MessageSquare },
  { id: "discord", name: "Discord", icon: MessageSquare },
];

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { signOut } = useAuth();
  const { conversations, loading: loadingConversations } = useConversations();
  const { messages, sendMessage, loading: loadingMessages } = useMessages(selectedConversationId);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const filteredConversations = selectedPlatform === "all" 
    ? conversations 
    : conversations.filter((c) => c.platform === selectedPlatform);

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && selectedConversationId) {
      await sendMessage(messageInput);
      setMessageInput("");
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setMessageInput(suggestion);
    setShowSuggestions(false);
  };

  const getConversationContext = () => {
    const lastMessages = messages.slice(-5).map(m => m.content).join(" ");
    return lastMessages || "Start of conversation";
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
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Platform Filters */}
        <aside className="w-20 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col items-center py-6 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  selectedPlatform === platform.id
                    ? "gradient-primary shadow-glow scale-110"
                    : "bg-secondary/80 hover:bg-secondary hover:scale-105"
                }`}
                title={platform.name}
              >
                <Icon
                  className={`w-5 h-5 transition-all ${
                    selectedPlatform === platform.id ? "text-white" : "text-muted-foreground"
                  }`}
                />
              </button>
            );
          })}
          <div className="flex-1" />
          <Button size="icon" variant="ghost" className="rounded-xl hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </Button>
        </aside>

        {/* Conversations List */}
        <aside className="w-80 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-background/50"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {loadingConversations ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No conversations yet. Start by creating one!
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`w-full p-3 rounded-lg flex items-start gap-3 transition-all ${
                      selectedConversationId === conv.id
                        ? "bg-accent shadow-md scale-[1.02]"
                        : "hover:bg-secondary/50 hover:scale-[1.01]"
                    }`}
                  >
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarFallback className="gradient-primary text-white">
                        {conv.contact_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conv.contact_name}
                        </h3>
                        {conv.last_message_time && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conv.last_message_time), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.last_message || "No messages yet"}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-pulse">
                        {conv.unread_count}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-gradient-to-br from-background to-background/95">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Avatar className="ring-2 ring-primary/20">
                    <AvatarFallback className="gradient-primary text-white">
                      {selectedConversation.contact_name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedConversation.contact_name}</h2>
                    <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      via {selectedConversation.platform}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className={showSuggestions ? "bg-accent" : ""}
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-6">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-muted-foreground">Loading messages...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex animate-fade-in ${
                          message.is_own ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 transition-all hover:scale-[1.02] ${
                            message.is_own
                              ? "gradient-primary text-white shadow-glow"
                              : "bg-card shadow-card border border-border/50"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span
                            className={`text-xs mt-1 block ${
                              message.is_own ? "text-white/70" : "text-muted-foreground"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                {showSuggestions && (
                  <div className="mb-4">
                    <AISuggestions
                      conversationContext={getConversationContext()}
                      onSelectSuggestion={handleSelectSuggestion}
                    />
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-background/50"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="shadow-glow hover:scale-105 transition-transform"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
