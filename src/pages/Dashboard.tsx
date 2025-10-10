import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Search,
  Settings,
  Plus,
  LogOut,
  User,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleSaveTask = async (taskData: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      await createTask(taskData);
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && task.status === activeFilter;
  });

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: TrendingUp,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: CheckCircle2,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "in_progress").length,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      title: "High Priority",
      value: tasks.filter((t) => t.priority === "high").length,
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">TaskHub</span>
        </div>
        <div className="flex items-center gap-3">
          <NotificationDropdown />
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
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

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.email?.split("@")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="p-6 shadow-card animate-fade-in hover:shadow-glow transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setTaskDialogOpen(true);
            }}
            className="shadow-glow gap-2"
          >
            <Plus className="w-5 h-5" />
            New Task
          </Button>
        </div>

        {/* Tasks Section */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="animate-fade-in">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeFilter} className="mt-6">
            {filteredTasks.length === 0 ? (
              <Card className="p-12 text-center shadow-card">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Create your first task to get started"}
                </p>
                <Button
                  onClick={() => {
                    setEditingTask(null);
                    setTaskDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Task
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
