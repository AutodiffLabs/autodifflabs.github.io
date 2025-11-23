import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { USER_NAME, REPO, DOC_FOLDER } from '@/constants';
import { GitHubFile } from '@/types';
import { FadeIn } from '../components/ui/Library';; // Assuming this exists from your previous code

const DocsPage: React.FC = () => {
  const { file } = useParams<{ file?: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchFiles() {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/repos/${USER_NAME}/${REPO}/contents/${DOC_FOLDER}`);
        const data = await res.json();
        
        if (!Array.isArray(data)) throw new Error("Invalid response from GitHub");

        const markdownFiles = data.filter((f: any) => f.name.endsWith('.md'));

        // Note: For large repos, fetch content on demand rather than all at once. 
        // Keeping logic as is for small doc sets per your original code.
        const contentPromises = markdownFiles.map(async (f: any) => {
          const fileRes = await fetch(f.download_url);
          const raw = await fileRes.text();
          return {
            name: f.name,
            content: marked(raw) // You might need to await marked.parse(raw) depending on version
          };
        });

        const allFiles = await Promise.all(contentPromises);
        if (isMounted) setFiles(allFiles);

        // Auto-open overview.md or first file
        if (isMounted && !file && allFiles.length > 0) {
          const defaultFile = allFiles.find(f => f.name.toLowerCase().includes('overview')) || allFiles[0];
          navigate(`/docs/${defaultFile.name}`, { replace: true });
        }
      } catch (err) {
        if (isMounted) setError('Failed to load documentation.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFiles();
    return () => { isMounted = false; };
  }, [file, navigate]);

  const selected = files.find(f => f.name === file);

  // Updated styling to match "Swiss-Style Tech" aesthetic
  const markdownStyles = `
    w-full max-w-3xl
    /* Headers */
    [&>h1]:text-4xl [&>h1]:font-light [&>h1]:text-gray-900 [&>h1]:mb-8 [&>h1]:tracking-tight
    [&>h2]:text-2xl [&>h2]:font-normal [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-200
    [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-gray-800 [&>h3]:mt-8 [&>h3]:mb-3
    
    /* Body Text */
    [&>p]:text-gray-500 [&>p]:font-light [&>p]:leading-loose [&>p]:mb-6 [&>p]:text-lg
    
    /* Lists */
    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:text-gray-500
    [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol]:text-gray-500
    [&>li]:mb-2 [&>li]:pl-1
    
    /* Links */
    [&>a]:text-sunflower-500 [&>a]:font-medium [&>a]:transition-colors [&>a]:hover:text-sunflower-600
    
    /* Code Blocks - Dark Theme */
    [&>pre]:bg-gray-900 [&>pre]:text-gray-200 [&>pre]:p-6 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-8 [&>pre]:border [&>pre]:border-gray-800
    
    /* Inline Code */
    [&>p>code]:bg-gray-100 [&>p>code]:text-gray-800 [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:rounded [&>p>code]:text-sm [&>p>code]:font-mono [&>p>code]:border [&>p>code]:border-gray-200
    
    /* Images */
    [&>img]:w-full [&>img]:h-auto [&>img]:rounded-xl [&>img]:my-8 [&>img]:shadow-sm [&>img]:border [&>img]:border-gray-100
    
    /* Blockquotes */
    [&>blockquote]:border-l-4 [&>blockquote]:border-sunflower-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
    
    /* Tables */
    [&>table]:w-full [&>table]:text-left [&>table]:mb-8 [&>table]:border-collapse
    [&>th]:font-medium [&>th]:text-gray-900 [&>th]:p-3 [&>th]:border-b [&>th]:border-gray-200 [&>th]:bg-gray-50
    [&>td]:p-3 [&>td]:border-b [&>td]:border-gray-100 [&>td]:text-gray-500
  `;

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-32 flex justify-center items-start">
       <div className="animate-pulse flex flex-col items-center gap-4">
         <div className="w-8 h-8 border-2 border-sunflower-500 border-t-transparent rounded-full animate-spin"></div>
         <p className="text-gray-400 font-light">Accessing Library...</p>
       </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 pt-32 flex justify-center">
      <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg border border-red-100">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar - Fixed on Desktop */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-32">
            <FadeIn>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Documentation</h3>
              <nav>
                <ul className="space-y-1 border-l border-gray-200 ml-1">
                  {files.map((f, index) => {
                    const isActive = f.name === file;
                    return (
                      <li key={f.name}>
                        <Link
                          to={`/docs/${f.name}`}
                          className={`block pl-4 py-2 text-sm transition-all duration-300 -ml-[1px] border-l-2 ${
                            isActive 
                              ? 'border-sunflower-500 text-gray-900 font-medium' 
                              : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                          }`}
                        >
                          {f.name.replace(/\.(md|markdown)$/, '').split('-').join(' ')}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </FadeIn>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {selected ? (
            <FadeIn key={selected.name} className="w-full">
              <article className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                 <div 
                   className={markdownStyles} 
                   dangerouslySetInnerHTML={{ __html: selected.content || '' }} 
                 />
              </article>
            </FadeIn>
          ) : (
            <div className="text-gray-400 font-light text-center py-20 border border-dashed border-gray-200 rounded-2xl">
              Select a topic from the sidebar to view documentation
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocsPage;