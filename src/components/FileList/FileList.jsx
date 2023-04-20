import { FileItem, FileListStyled } from './FileList.styled'
import { File } from '../File/File'
import {Folder} from '../Folder/Folder'

export const FileList = ({files, handleFolderClick}) => {
    return (
        <FileListStyled>
                  {!files ? (
                    <p>This folder is empty</p>
                  ) : (
                    files.map(file => {
                      const type = file['.tag'];
                      return (
                        <FileItem
                          key={file.id}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          {type === 'file' && (
                            <File
                              name={file.name}
                              thumbnail={file.thumbnail}
                              path={file.path_lower}
                            ></File>
                          )}
                          {type === 'folder' && (
                            <Folder
                              handleFolderClick={handleFolderClick}
                              name={file.name}
                              path={file.path_lower}
                            ></Folder>
                          )}
                        </FileItem>
                      );
                    })
                  )}
            </FileListStyled>
    )
}