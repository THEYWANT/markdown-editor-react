import { useState, useEffect } from 'react'
import { marked } from 'marked'

function App() {
  // 1. 初始化時先從 localStorage 攞返上次寫過嘅嘢
  const [markdown, setMarkdown] = useState<string>(() => {
    return localStorage.getItem('markdown-content') || '# Start writing here...';
  });

  // 2. 當 markdown 內容變動，自動儲存
  useEffect(() => {
    localStorage.setItem('markdown-content', markdown);
  }, [markdown]);

  const getHtml = () => {
    return { __html: marked.parse(markdown) };
  };

  const downloadFile = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document-${new Date().toLocaleDateString()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      backgroundColor: '#f5f5f7', // 經典 Apple 灰底
      minHeight: '100vh', 
      padding: '40px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 20px auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1d1d1f' }}>Markdown Editor</h1>
        <button 
          onClick={downloadFile}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0071e3',
            color: '#fff',
            border: 'none',
            borderRadius: '18px', // 圓角按鈕
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Export File
        </button>
      </header>
      
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        gap: '20px', 
        height: '75vh' 
      }}>
        {/* 輸入區 */}
        <textarea
          style={{
            flex: 1,
            padding: '30px',
            fontSize: '18px', 
            lineHeight: '1.6',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // 微陰影
            fontFamily: '"SF Mono", Menlo, monospace',
            outline: 'none',
            resize: 'none'
          }}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type Markdown here..."
        />

        {/* 預覽區 */}
        <div
          style={{
            flex: 1,
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            overflowY: 'auto',
            lineHeight: '1.6'
          }}
          className="prose" // 模擬現代排版
          dangerouslySetInnerHTML={getHtml()}
        />
      </main>
    </div>
  )
}

export default App