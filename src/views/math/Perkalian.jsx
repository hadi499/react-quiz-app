import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { Link } from "react-router-dom";
import quizQuestions from '../../data/math/perkalian.json';

export const Perkalian = () => {
  // Fungsi untuk mengacak array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const [autoSubmitMessage, setAutoSubmitMessage] = useState("");
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

  // Acak pertanyaan hanya sekali saat load
  useEffect(() => {
    setQuizData(shuffleArray(quizQuestions));
  }, []);

  // Reset timer tiap kali ganti pertanyaan
  useEffect(() => {
    setTimeLeft(7);
    setAutoSubmitMessage("");
    setIsAutoSubmitting(false);
  }, [currentQuestion]);

  // Countdown timer
  useEffect(() => {
    if (!quizCompleted && !showResult && quizData.length > 0) {
      if (timeLeft === 0 && !isAutoSubmitting) {
        setIsAutoSubmitting(true);
        if (selectedAnswer !== null) {
          handleNextQuestion(false, selectedAnswer);
          setAutoSubmitMessage("Jawaban otomatis disimpan karena waktu habis ⏰");
        } else {
          handleNextQuestion(true, null);
          setAutoSubmitMessage("Waktu habis, soal dianggap tidak dijawab ⏰");
        }
        return;
      }
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizCompleted, showResult, selectedAnswer, isAutoSubmitting, quizData]);

  // Pilih jawaban
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  // Lanjut ke pertanyaan berikutnya
  const handleNextQuestion = (autoSkip = false, answer = null) => {
    const newAnswers = [...userAnswers];
    if (!autoSkip) {
      newAnswers[currentQuestion] = answer;
    } else {
      newAnswers[currentQuestion] = null;
    }
    setUserAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  // Hitung skor
  const calculateScore = (answers = userAnswers) => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuizData(shuffleArray(quizQuestions)); // acak ulang
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setShowAnswerKey(false);
    setTimeLeft(7);
    setAutoSubmitMessage("");
    setIsAutoSubmitting(false);
  };

  // Warna skor
  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // ====== Kalau data belum siap ======
  if (quizData.length === 0) {
    return <div className="text-center mt-20 text-xl">Loading soal...</div>;
  }

  // ================= HALAMAN HASIL QUIZ =================
  if (showResult) {
    const finalAnswers = userAnswers;
    const score = calculateScore(finalAnswers);
    const percentage = Math.round((score / quizData.length) * 100);

    return (
      <div className="min-h-screen  p-4 ">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-2xl shadow-xl p-8 mt-20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Hasil Quiz</h1>
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, quizData.length)}`}>
                {score}/{quizData.length}
              </div>
              <div className={`text-2xl font-semibold mb-6 ${getScoreColor(score, quizData.length)}`}>
                Skor: {percentage}%
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Kunci Jawaban</h2>
                <button
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 space-x-2"
                >
                  {showAnswerKey ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Sembunyikan</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Lihat Jawaban</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {showAnswerKey && (
                <div className="space-y-6">
                  {quizData.map((q, index) => {
                    const userAnswer = finalAnswers[index];
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800 flex-1">{q.question}</h3>
                        </div>

                        <div className="ml-11 space-y-3">
                          {q.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-3">
                              <div className="flex items-center">
                                {optionIndex === q.correct ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : userAnswer === optionIndex ? (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                ) : (
                                  <div className="w-5 h-5" />
                                )}
                              </div>
                              <span
                                className={`${optionIndex === q.correct
                                  ? 'text-green-600 font-semibold'
                                  : userAnswer === optionIndex && optionIndex !== q.correct
                                    ? 'text-red-600 font-semibold'
                                    : 'text-gray-600'
                                  }`}
                              >
                                {option}
                              </span>
                            </div>
                          ))}

                          {userAnswer === null && (
                            <p className="mt-2 text-red-500 font-medium">Tidak dijawab</p>
                          )}

                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-blue-800 text-sm">
                              <strong>Penjelasan:</strong> {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="text-center mt-8 flex justify-between items-center">
              <Link to="/math" className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 space-x-2">Math Quiz lists</Link>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Ulangi Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= HALAMAN SOAL QUIZ =================
  return (
    <div className="min-h-screen  p-4 ">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Perkalian</h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>Pertanyaan {currentQuestion + 1} dari {quizData.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                ></div>
              </div>
              <span className="font-semibold text-red-600">{timeLeft}s</span>
            </div>

            {autoSubmitMessage && (
              <div className="mt-3 text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-2 rounded-lg inline-block">
                {autoSubmitMessage}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {quizData[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                        }`}
                    >
                      {selectedAnswer === index && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleNextQuestion(false, selectedAnswer)}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${selectedAnswer !== null
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {currentQuestion === quizData.length - 1 ? 'Selesai' : 'Selanjutnya'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


