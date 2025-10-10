import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowLeft, Bell, Shield, Moon, Sun, Trash2, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Settings = () => {
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: true,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      // Note: Account deletion should be handled server-side for security
      toast.error("Please contact support to delete your account");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Settings</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Account Info */}
        <Card className="p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <UserCog className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Account Information</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Input value={user?.email || ""} disabled />
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Verified
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={user?.id || ""} disabled className="font-mono text-xs" />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Security</h2>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </Card>

        {/* Appearance */}
        <Card className="p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              {darkMode ? (
                <Moon className="w-5 h-5 text-white" />
              ) : (
                <Sun className="w-5 h-5 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-semibold">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={(checked) => {
                  setDarkMode(checked);
                  document.documentElement.classList.toggle("dark", checked);
                }}
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-semibold">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-semibold">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get push notifications on mobile
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-semibold">Desktop Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Show notifications on desktop
                </p>
              </div>
              <Switch
                checked={notifications.desktop}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, desktop: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 shadow-card animate-fade-in border-destructive/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-destructive/20 rounded-lg">
              <h3 className="font-semibold mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
