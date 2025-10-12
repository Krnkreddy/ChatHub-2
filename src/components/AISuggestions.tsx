import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AISuggestionsProps {
  conversationContext: string;
  onSelectSuggestion: (suggestion: string) => void;
}

export const AISuggestions = ({
  conversationContext,
  onSelectSuggestion,
}: AISuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-suggestions", {
        body: { context: conversationContext },
      });

      if (error) throw error;

      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={generateSuggestions}
        disabled={loading}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Suggestions
          </>
        )}
      </Button>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <Card
              key={index}
              className="p-3 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <p className="text-sm">{suggestion}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
