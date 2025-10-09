import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ChatHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent gradient-hero bg-gradient-to-r from-primary via-blue-500 to-telegram">
              All Your Chats,
              <br />
              One Powerful Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect WhatsApp, Telegram, Messenger, Discord, and more. Manage all your conversations from one beautiful interface.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="shadow-glow">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Platform Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              { name: "WhatsApp", color: "whatsapp" },
              { name: "Telegram", color: "telegram" },
              { name: "Messenger", color: "messenger" },
              { name: "Discord", color: "discord" },
              { name: "Slack", color: "slack" },
            ].map((platform) => (
              <div
                key={platform.name}
                className="px-4 py-2 rounded-full bg-card border border-border shadow-card"
              >
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose ChatHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unified Inbox</h3>
              <p className="text-muted-foreground">
                See all your messages from every platform in one chronological feed. Never miss a conversation again.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Real-time synchronization ensures your messages are always up to date across all platforms.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted end-to-end. We never store your messages or access your conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl gradient-primary text-white shadow-glow">
            <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Simplify Your Communication?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have unified their messaging experience with ChatHub.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 ChatHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
