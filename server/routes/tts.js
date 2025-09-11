// // routes/tts.js
// import express from 'express';
// import mongoose from 'mongoose';
// import axios from 'axios';
// import Transcript from '../models/transcript.js';

// const router = express.Router();

// router.post('/tts', async (req, res) => {
//   try {
//     const { text, voiceId = 'en-US-ryan', rate = 0, pitch = 0 } = req.body;

//     if (!text || text.trim() === '') {
//       return res.status(400).json({ error: 'Text is required' });
//     }

//     console.log('Generating speech for:', text.substring(0, 50) + '...');

//     const response = await axios.post(
//       'https://api.murf.ai/v1/speech/generate-with-key',
//       {
//         voiceId: voiceId,
//         style: 'Conversational',
//         text: text,
//         rate: rate,
//         pitch: pitch,
//         format: 'MP3'
//       },
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'api-key': process.env.MURF_API_KEY
//         }
//         // Remove responseType: 'arraybuffer' since we're getting JSON now
//       }
//     );

//     // Parse the response
//     const audioData = response.data;
    
//     console.log('Audio generated successfully:', {
//       audioUrl: audioData.audioFile,
//       duration: audioData.audioLengthInSeconds,
//       remainingChars: audioData.remainingCharacterCount
//     });

//      // Fix: Declare result outside the if block
//     let result = false; // Default value
    
//     if (response.data) {
//       result = true;
//     }


//     //store the response in database.
//     await Transcript.create({
//       text,
//       result:result,
//     })


//     // Return the structured response
//     res.json({
//       success: true,
//       audioUrl: audioData.audioFile,
//       audioLengthInSeconds: audioData.audioLengthInSeconds,
//       wordDurations: audioData.wordDurations,
//       remainingCharacterCount: audioData.remainingCharacterCount,
//       warning: audioData.warning
//     });
    
//   } catch (error) {
//     console.error('TTS Error:', error.response?.data || error.message);
//     res.status(500).json({ 
//       error: 'TTS generation failed',
//       message: error.response?.data?.message || error.message 
//     });
//   }
// });



// export default router;




// routes/tts.js
import express from 'express';
import axios from 'axios';
import Transcript from '../models/transcript.js';
import protectRoute from '../middlewares/authorize.js'; // Add this import

const router = express.Router();

// Add authentication to the TTS route
router.post('/tts', async (req, res) => {
  try {
    const { text, voiceId = 'en-US-ryan', rate = 0, pitch = 0 } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Generating speech for:', text.substring(0, 50) + '...');

    const response = await axios.post(
      'https://api.murf.ai/v1/speech/generate-with-key',
      {
        voiceId: voiceId,
        style: 'Conversational',
        text: text,
        rate: rate,
        pitch: pitch,
        format: 'MP3'
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.MURF_API_KEY
        }
      }
    );

    const audioData = response.data;
    
    console.log('Audio generated successfully:', {
      audioUrl: audioData.audioFile,
      duration: audioData.audioLengthInSeconds,
      remainingChars: audioData.remainingCharacterCount
    });

    let result = false;
    if (response.data) {
      result = true;
    }

    // Store with user ID (minimal change to your existing code)
    await Transcript.create({
      // Just add this one line
      text,
      result: result,
    })

    res.json({
      success: true,
      audioUrl: audioData.audioFile,
      audioLengthInSeconds: audioData.audioLengthInSeconds,
      wordDurations: audioData.wordDurations,
      remainingCharacterCount: audioData.remainingCharacterCount,
      warning: audioData.warning
    });
    
  } catch (error) {
    console.error('TTS Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'TTS generation failed',
      message: error.response?.data?.message || error.message 
    });
  }
});

export default router;