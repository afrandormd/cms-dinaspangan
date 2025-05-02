import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Toolbar from './Toolbar'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'

const TipTap = ({onChange,content}:any) => {
    const handleChange = (newContent: string) => {
      onChange(newContent)
    }

    const uploadImage = async (file:any) => {
      const formData = new FormData();
      formData.append('file', file);
    
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
      return data.url;
    }

    const editor = useEditor({
        extensions: [
          StarterKit.configure({
            bulletList: {
              keepMarks: true,
              keepAttributes: false,
            },
            orderedList: {
              keepMarks: true,
              keepAttributes: false,
            },
            dropcursor: {
              color: '#ff0000',
              width: 2,
            },
          }),
          Image.configure({
            inline: true,
            allowBase64: true,
          }),
          Underline,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Link.configure({
            autolink: true,
          }),
        ],
        editorProps: {
          attributes: {
            class: 
            "flex flex-col px-4 py-3 border-b border-t border-l border-gray-700 text-gray-400 w-full pt-4 rounded-bl-md rounded-br-md outline-none"
          }
        },
        onUpdate: ({editor}) => {
          handleChange(editor.getHTML())
        }
      })
    
      return (<div className='w-full px-4'>
        <Toolbar editor={editor} content={content} />
        <EditorContent style={{whiteSpace: 'pre-line'}} className='' editor={editor} />
      </div>
      )
}

export default TipTap