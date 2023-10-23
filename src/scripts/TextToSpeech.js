export function textToSpeech(text) {
  // Create a new SpeechSynthesisUtterance object
  const speaker = new SpeechSynthesisUtterance();

  // Set the text and voice
  speaker.text = text;
  speaker.voice = window.speechSynthesis.getVoices()[0];

  window.speechSynthesis.speak(speaker);
}
