/* Couche de données. MODE DÉMO : stockage local du navigateur (pour valider le design).
   Étape suivante : on remplace ces fonctions par Supabase, sans toucher aux pages. */
(function(){
  const KEY = "bmt_quiz_attempts_v1";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");

  window.BMT_STORE = {
    mode: "demo",
    async getQuiz(){ return window.BMT_QUIZ; },
    async hasAttempted(name){ return read().some(a => norm(a.name) === norm(name)); },
    async submit(name, answers){
      const quiz = window.BMT_QUIZ;
      const score = answers.reduce((n, a, i) => n + (a === quiz.questions[i].answer ? 1 : 0), 0);
      const rec = { id: Date.now() + "-" + Math.random().toString(36).slice(2,7), name: name.trim(), answers, score, total: quiz.questions.length, at: new Date().toISOString() };
      const all = read(); all.push(rec); write(all);
      return rec;
    },
    async listAttempts(){ return read().sort((a,b) => b.at.localeCompare(a.at)); },
    async reset(){ write([]); }
  };
})();
