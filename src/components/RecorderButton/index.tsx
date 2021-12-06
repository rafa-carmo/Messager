import MicIcon from '@material-ui/icons/Mic'
import { useState } from 'react';
import { ShowRecord, ProcessRecord } from 'react-nextjs-record'
import * as S from './styles'


function RecorderButton() {
    let {
        blobURL,
        readyRecording,
        isRecording,
        completeRecording,
        startRecording,
        reStartRecording,
        stopRecording,
        onStop,
      } = ProcessRecord();

      const [onRecording, setOnRecording] = useState(false)

      const handleRecord = () => {
          console.log(onRecording)
        if(onRecording){
            stopRecording()
            setOnRecording(false)
        }else{
            startRecording()
            setOnRecording(true)
        }
        }
        
    return (
        <div>                 
        <S.Hidden>
        <ShowRecord />
        </S.Hidden>
        <S.IconButton onClick={handleRecord} active={onRecording} >
            <MicIcon />
            {onRecording && (
                <p>Gravando...</p>
            )}
        </S.IconButton>
        </div>
    )
}

export default RecorderButton
