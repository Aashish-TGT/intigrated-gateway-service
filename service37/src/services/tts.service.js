const sdk = require("microsoft-cognitiveservices-speech-sdk");

async function speakText(text) {
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_REGION
    );

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        synthesizer.close();
        resolve(result);
      },
      (err) => {
        synthesizer.close();
        reject(err);
      }
    );
  });
}

module.exports = { speakText };
