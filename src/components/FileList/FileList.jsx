import { FileItem, FileListStyled } from './FileList.styled'
import { File } from '../File/File'
import { Folder } from '../Folder/Folder'
import {MdDeleteForever } from 'react-icons/md'

export const FileList = ({ files, handleDeleteBtnClick }) => {

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
                              name={file.name}
                              path={file.path_lower}
                            ></Folder>
                          )}
                          <button onClick={() => handleDeleteBtnClick(file.name, type, file.path_lower)} style={{ marginLeft: '10px', color: 'red' }}>
                            <MdDeleteForever/></button>
                        </FileItem>
                      );
                    })
                  )}
            </FileListStyled>
    )
}