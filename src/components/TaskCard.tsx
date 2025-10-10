import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, Edit, Calendar } from "lucide-react";
import { Task } from "@/hooks/useTasks";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(task.status === "completed");

  const handleCheckChange = (checked: boolean) => {
    setIsChecked(checked);
    onUpdate(task.id, { status: checked ? "completed" : "todo" });
  };

  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    high: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const statusColors = {
    todo: "bg-secondary text-secondary-foreground",
    in_progress: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <Card className="p-4 hover:shadow-card transition-all animate-fade-in">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckChange}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={`font-semibold ${
                isChecked ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card z-50">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={statusColors[task.status]}>
              {task.status.replace("_", " ")}
            </Badge>
            {task.due_date && (
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.due_date), "MMM dd")}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
