import React from 'react'
import {
  FilePdfOutlined, PictureOutlined, ExpandOutlined, UserOutlined,
  IdcardOutlined, CalendarOutlined, MergeCellsOutlined, RetweetOutlined,
  CompressOutlined, ScissorOutlined, ToolOutlined, LockOutlined,
  UnlockOutlined, FontColorsOutlined, RedoOutlined, ZoomInOutlined,
  FileTextOutlined, HeartOutlined, CameraOutlined, EditOutlined,
  HighlightOutlined, BgColorsOutlined, FileImageOutlined, FileWordOutlined,
} from '@ant-design/icons'

const ICON_MAP = {
  'file-pdf':      <FilePdfOutlined />,
  'picture':       <PictureOutlined />,
  'expand':        <ExpandOutlined />,
  'user':          <UserOutlined />,
  'idcard':        <IdcardOutlined />,
  'calendar':      <CalendarOutlined />,
  'merge-cells':   <MergeCellsOutlined />,
  'retweet':       <RetweetOutlined />,
  'compress':      <CompressOutlined />,
  'scissor':       <ScissorOutlined />,
  'tool':          <ToolOutlined />,
  'lock':          <LockOutlined />,
  'unlock':        <UnlockOutlined />,
  'font-colors':   <FontColorsOutlined />,
  'redo':          <RedoOutlined />,
  'zoom-in':       <ZoomInOutlined />,
  'file-text':     <FileTextOutlined />,
  'heart':         <HeartOutlined />,
  'camera':        <CameraOutlined />,
  'edit':          <EditOutlined />,
  'highlight':     <HighlightOutlined />,
  'bg-colors':     <BgColorsOutlined />,
  'file-image':    <FileImageOutlined />,
  'file-word':     <FileWordOutlined />,
}

export default function ToolIcon({ icon, style }) {
  return (
    <span style={style}>
      {ICON_MAP[icon] || <ToolOutlined />}
    </span>
  )
}
