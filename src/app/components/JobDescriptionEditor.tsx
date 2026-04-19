"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Undo,
  Redo,
} from "lucide-react";

export default function JobDescriptionEditor({
  onChange,
  initialContent,
}: {
  onChange?: (json: object) => void;
  initialContent?: string | object;
}) {
  // Process initial content to ensure it's in the right format for TipTap
  const processInitialContent = (content: string | object | undefined): string | object => {
    if (!content) return "";
    
    // If it's already a string, check if it's a JSON string that needs parsing
    if (typeof content === "string") {
      // Check if it looks like a JSON string (starts with { and ends with })
      if (content.trim().startsWith('{"type":"doc"') && content.trim().endsWith('}')) {
        try {
          const parsed = JSON.parse(content);
          // Verify it's a valid TipTap document structure
          if (parsed.type === "doc" && parsed.content) {
            return parsed;
          }
        } catch (e) {
          console.warn("Failed to parse job description JSON:", e);
          // If parsing fails, return the string as-is
          return content;
        }
      }
      // Regular string content
      return content;
    }
    
    // If it's an object and looks like TipTap JSON, return it
    if (typeof content === "object" && content !== null) {
      // Check if it's a valid TipTap document structure
      if ('type' in content && 'content' in content) {
        return content;
      }
      // If it's just a plain object, try to convert to readable text
      // This is a fallback for when we get unexpected object formats
      return "";
    }
    
    return "";
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable StarterKit's default list extensions to avoid conflicts
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'tiptap-list-item',
        },
      }),
      Placeholder.configure({
        placeholder: "Provide a detailed job description...",
      }),
    ],
    content: processInitialContent(initialContent),
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    immediatelyRender: false,
  }, [initialContent]); // Add dependency to re-initialize when content changes

  if (!editor) return null;

  const Button = ({
    onClick,
    isActive,
    label,
    children,
  }: {
    onClick: () => void;
    isActive?: boolean;
    label: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? "bg-indigo-500/20 text-indigo-400"
          : "text-gray-300 hover:bg-gray-700/50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-gray-700/50 px-2 py-2">
        <Button
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          label="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          label="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="p-3 min-h-[200px] text-gray-100">
        <EditorContent editor={editor} />
        <style jsx>{`
          :global(.ProseMirror) {
            outline: none;
            color: rgb(243 244 246);
            line-height: 1.6;
          }
          
          :global(.ProseMirror .tiptap-bullet-list) {
            list-style-type: disc;
            margin-left: 1.25rem;
            padding-left: 0;
          }
          
          :global(.ProseMirror .tiptap-ordered-list) {
            list-style-type: decimal;
            margin-left: 1.25rem;
            padding-left: 0;
          }
          
          :global(.ProseMirror .tiptap-list-item) {
            margin: 0.25rem 0;
            padding-left: 0.5rem;
            display: list-item;
          }
          
          :global(.ProseMirror ul, .ProseMirror ol) {
            margin: 0.75rem 0;
          }
          
          :global(.ProseMirror h1, .ProseMirror h2, .ProseMirror h3) {
            font-weight: 600;
            margin: 1rem 0 0.5rem 0;
          }
          
          :global(.ProseMirror h1) {
            font-size: 1.5rem;
          }
          
          :global(.ProseMirror h2) {
            font-size: 1.25rem;
          }
          
          :global(.ProseMirror h3) {
            font-size: 1.125rem;
          }
          
          :global(.ProseMirror p) {
            margin: 0.5rem 0;
          }
          
          :global(.ProseMirror p.is-editor-empty:first-child::before) {
            color: rgb(156 163 175);
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}</style>
      </div>
    </div>
  );
}