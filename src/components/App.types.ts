export interface FileType  {
  ['.tag']: string,
  id: string,
  name: string,
  path_display: string, 
  path_lower: string,
  thumbnail?: string
}

export interface ThumbnailType {
  ['.tag']: string,
  metadata: {
    path_lower: string,
    [key: string]: any
  }
  thumbnail: string
}