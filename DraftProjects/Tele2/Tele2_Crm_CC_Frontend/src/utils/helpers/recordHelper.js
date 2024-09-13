import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

/**
 * @summary Helper for recordering audio based on RecordRTC
 * @example
 */
export function Recorder () {
  return new Promise(async (resolve, reject) => {
    let microphoneStream = null
    let recorderRTC = null

    try {
      microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      recorderRTC = RecordRTC(microphoneStream, {
        type: 'audio/wav',
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        mimeType: 'audio/wav',
        desiredSampRate: 8000,
        disableLogs: true,
        bitrate: 16000,
        bufferSize: 1024
      })
    } catch (error) {
      reject(error)
    }
    /**
     * This method starts the recording.
     * @memberof Recorder
     */
    const start = () => recorderRTC.startRecording()

    /**
     * This method stops the recording.
     * @memberof Recorder
     * @returns {Promise File} of record
     */
    const stop = () => new Promise((resolve, reject) => {
      recorderRTC.stopRecording(() => {
        // Stop all user devices access
        microphoneStream.getTracks().forEach((track) => {
          track.stop()
        })
        const audioBlob = recorderRTC.getBlob()
        if (!audioBlob) {
          reject(new Error('Record error: empty blob'))
        } else {
          resolve({ audioBlob })
        }
      })
    })

    /**
     * This method gets recording state.
     * @memberof Recorder
     * @returns {boolean} recording state
     */
    const recording = () => recorderRTC.getState() === 'recording'

    resolve({ start, stop, recording })
  })
}
