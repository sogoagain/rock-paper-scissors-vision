import React, { useEffect, useState, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

import MutedText from './MutedText';
import Spinner from './Spinner';

export default function GameSection() {
  const PROVIDED_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/-RxweLcY_/';
  const RPS_EMOJI = {
    rock: '✊',
    paper: '✋',
    scissors: '✌',
  };
  const HAND_TO_NUMBER = {
    rock: 0,
    paper: 1,
    scissors: 2,
  };

  const webcamRef = useRef();
  const [initialState, setInitialState] = useState({
    model: null,
    webcam: null,
    maxPredictions: null,
  });
  const [roundState, setRoundState] = useState({
    user: {
      emoji: '',
      result: '',
    },
    ai: {
      emoji: '',
      result: '',
    },
  });

  const calculateRoundResult = (leftHand, rightHand) => {
    const leftNumber = HAND_TO_NUMBER[leftHand];
    const rightNumber = HAND_TO_NUMBER[rightHand];

    if ((leftNumber + 1) % 3 === rightNumber) {
      return 'Lose';
    }
    if ((leftNumber + 2) % 3 === rightNumber) {
      return 'Win';
    }
    return 'Draw';
  };

  const predict = async () => {
    // predict can take in an image, video or canvas html element
    const predictions = await initialState.model.predict(initialState.webcam.canvas);
    const result = new Map();
    [...new Array(initialState.maxPredictions)].forEach((item, index) => {
      const { className } = predictions[index];
      const probability = parseFloat(predictions[index].probability.toFixed(2));
      result.set(className, probability);
    });
    const max = [...result.entries()].reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc));
    return {
      prediction: {
        className: max[0],
        probability: max[1],
      },
      classes: [...result.keys()],
    };
  };

  async function loop() {
    initialState.webcam.update(); // update the webcam frame
    // await predict();
    window.requestAnimationFrame(loop);
  }

  const init = async () => {
    const modelURL = `${PROVIDED_MODEL_URL}model.json`;
    const metadataURL = `${PROVIDED_MODEL_URL}metadata.json`;

    const model = await tmImage.load(modelURL, metadataURL);
    const maxPredictions = model.getTotalClasses();

    const webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    await model.predict(webcam.canvas);

    setInitialState({
      ...initialState,
      model,
      webcam,
      maxPredictions,
    });
  };

  const handleClick = async () => {
    const result = await predict();
    const userHand = result.prediction.className;
    const aiHand = result.classes[Math.floor(Math.random() * result.classes.length)];
    setRoundState({
      user: {
        emoji: RPS_EMOJI[userHand],
        result: calculateRoundResult(userHand, aiHand),
      },
      ai: {
        emoji: RPS_EMOJI[aiHand],
        result: calculateRoundResult(aiHand, userHand),
      },
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!initialState.model || !initialState.webcam || !initialState.maxPredictions) {
      return;
    }
    window.requestAnimationFrame(loop);
    webcamRef.current.appendChild(initialState.webcam.canvas);
  }, [initialState]);

  return (
    <section className="d-flex align-items-center" style={{ height: '80vh' }}>
      <div className="container text-center">
        <MutedText
          text="Rest assured. The video is only used in your local browser."
        />
        <div className="card">
          <h5 className="card-header">
            You
            {` ${roundState.user.result}`}
          </h5>
          <div className="card-body py-0">
            {!initialState.webcam ? (
              <Spinner
                width={200}
                height={200}
              />
            ) : null}
            <div ref={webcamRef} />
            <p className="card-text h3">{roundState.user.emoji}</p>
          </div>
        </div>
        <p className="h3 my-3">
          VS
        </p>
        <div className="card">
          <h5 className="card-header">
            AI
            {` ${roundState.ai.result}`}
          </h5>
          <div className="card-body">
            <p className="card-text h3">{roundState.ai.emoji}</p>
          </div>
        </div>
        <div className="my-3">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            disabled={!initialState.webcam}
            onClick={handleClick}
          >
            play
          </button>
        </div>
      </div>
    </section>
  );
}
