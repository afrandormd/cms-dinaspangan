import React from 'react'
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    ImageIcon,
    Heading1,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Ruler,
    Minus,
    Link
  } from 'lucide-react';
import { type Editor } from '@tiptap/react';
  
  type Props = {
    editor: Editor | null,
    content: string
  }

const Toolbar = ({editor,content}:Props) => {
    if (!editor) return null;

  return (
    <div className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700'>
        <div className='flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap'>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className={
                    editor.isActive('bold')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Bold className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={
                    editor.isActive('underline')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Underline className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={
                    editor.isActive('italic')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Italic className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={
                    editor.isActive('italic')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Strikethrough className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level:1}).run();
                }}
                className={
                    editor.isActive('italic')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Heading1 className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level:2}).run();
                }}
                className={
                    editor.isActive('italic')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Heading2 className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={
                    editor.isActive('bulletList')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><List className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className={
                    editor.isActive('orderedList')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><ListOrdered className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={
                    editor.isActive('blockquote')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Quote className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleCode().run();
                }}
                className={
                    editor.isActive('code')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Code className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('left').run();
                }}
                className={
                    editor.isActive({ textAlign: 'left' })
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><AlignLeft className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('center').run();
                }}
                className={
                    editor.isActive({ textAlign: 'center' })
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><AlignCenter className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('right').run();
                }}
                className={
                    editor.isActive({ textAlign: 'right' })
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><AlignRight className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setHorizontalRule().run();
                }}
                className={
                    editor.isActive({ textAlign: 'horizontalRule' })
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Minus className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setLink({href:e.currentTarget.value}).run();
                }}
                className={
                    editor.isActive({ textAlign: 'image' })
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Link className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                }}
                className={
                    editor.isActive('orderedList')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Undo className='size-5' /></button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                }}
                className={
                    editor.isActive('orderedList')
                   ? 'bg-gray-700 text-white p-1 rounded-lg'
                   : 'bg-gray-300 text-white p-1 rounded-lg'
                }
            ><Redo className='size-5' /></button>
        </div>
    </div>
  )
}

export default Toolbar