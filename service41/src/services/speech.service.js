const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");

async function transcribeVoice(audioFilePath) {
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_REGION
    );

    const pushStream = sdk.AudioInputStream.createPushStream();
    fs.createReadStream(audioFilePath).on("data", (buffer) => pushStream.write(buffer))
      .on("end", () => pushStream.close());

    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        resolve(result.text);
      } else {
        reject("Speech not recognized");
      }
    });
  });
}

module.exports = { transcribeVoice };
