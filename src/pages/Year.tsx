import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with real data from database
const SAMPLE_PDFS = [
  { id: 1, name: "Mathematics - Question Paper", type: "question_paper" },
  { id: 2, name: "Physics - Notes", type: "notes" },
  { id: 3, name: "Chemistry - Question Paper", type: "question_paper" },
  { id: 4, name: "English - Notes", type: "notes" },
];

const Year = () => {
  const { semesterId, year } = useParams();
  const { toast } = useToast();

  const handleDownload = (pdfName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${pdfName}...`,
    });
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

        <div className="grid grid-cols-1 gap-4">
          {SAMPLE_PDFS.map((pdf) => (
            <Card key={pdf.id} className="p-6 hover:shadow-elevated transition-all duration-300 bg-card border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {pdf.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">
                      {pdf.type.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(pdf.name)}
                  className="bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Year;
