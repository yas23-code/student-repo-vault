import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  name: string;
  type: string;
  file_path: string;
}

const Year = () => {
  const { semesterId, year } = useParams();
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [semesterId, year]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('semester', parseInt(semesterId || '0'))
        .eq('year', parseInt(year || '0'))
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading resources",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resource: Resource) => {
    try {
      const { data, error } = await supabase.storage
        .from('pdfs')
        .download(resource.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: `Downloading ${resource.name}...`,
      });
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to={`/semester/${semesterId}`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Years
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            Semester {semesterId} - Year {year}
          </h1>
          <p className="text-muted-foreground text-lg">
            Available study materials and question papers
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">
            Loading resources...
          </div>
        ) : resources.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No resources found
            </h3>
            <p className="text-muted-foreground">
              No PDFs have been uploaded for Semester {semesterId} - Year {year} yet.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="p-4 sm:p-6 hover:shadow-elevated transition-all duration-300 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 capitalize">
                      {resource.type.replace("_", " ")}
                    </p>
                    <Button
                      onClick={() => handleDownload(resource)}
                      className="w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Year;
