import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "completed";
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks((data as Task[]) || []);
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) return { error: new Error("No user") };

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({ ...task, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      
      setTasks((prev) => [data as Task, ...prev]);
      toast.success("Task created successfully");
      return { data, error: null };
    } catch (error: any) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
      return { data: null, error };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      
      setTasks((prev) => prev.map((t) => (t.id === id ? data as Task : t)));
      toast.success("Task updated successfully");
      return { data, error: null };
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
      return { data: null, error };
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted successfully");
      return { error: null };
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      return { error };
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
