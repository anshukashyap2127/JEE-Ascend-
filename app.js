// >>> OPTIONAL: fill these in to also log every registration to a Google Sheet. <<<
// See the setup steps in chat for how to get these three values from a Google Form.
// Leave GOOGLE_FORM_ACTION_URL blank ('') to disable this — nothing breaks if it's empty.
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd4aAuoIUitSXk-cBlXyjzJu7eIhwGdagEzP1lcSe6BPg8DBg/formResponse";
const GOOGLE_FORM_ENTRY_IDS = {
  name: "entry.2005620554",
  email: "entry.1045781291",
  class: "entry.1065046570",
  exam: "entry.1166974658"
};

const QUOTES = [
  "Discipline is choosing what you want most over what you want right now.",
  "Motivation gets you started. A schedule keeps you going.",
  "You don't rise to the occasion — you fall to your routine. Build a good one.",
  "The days you don't feel like it are exactly the days that count.",
  "A plan followed loosely still beats a perfect plan followed never.",
  "Discipline isn't punishment. It's just doing today what you decided yesterday.",
  "Nobody feels like it every day. They just stopped waiting to feel like it.",
  "The habit matters more than the mood.",
  "Small disciplined hours compound. Rare heroic ones don't.",
  "Show up on the boring days. That's the whole skill.",
  "Consistency is a hundred unremarkable days stacked on top of each other.",
  "You're not chasing inspiration. You're building a system that doesn't need it.",
  "Doing the minimum on a bad day beats doing nothing at all.",
  "Willpower runs out. Routines don't.",
  "One disciplined week rewrites what feels possible.",
  "Repetition is not boring — it's how mastery is actually built.",
  "The version of you that studied today built the version that scores well later.",
  "You don't need a better mood. You need the next task in front of you.",
  "Discipline today is confidence on exam day.",
  "Every rep, physical or mental, is a small deposit — none of them evaporate.",
  "One tab open. One task. One hour. That's the whole method.",
  "Half-focus for four hours moves you less than full focus for one.",
  "Your phone will still be there after this chapter isn't.",
  "Multi-tasking is just switching costs wearing a disguise.",
  "Give one problem your full attention before giving ten your partial attention.",
  "Distraction feels productive. It rarely is.",
  "A quiet hour beats a noisy four.",
  "Protect your first hour of the day — it sets the tone for the rest.",
  "The next 25 minutes, undivided, will do more than the next three scattered hours.",
  "Attention is the actual resource. Spend it on purpose.",
  "Close the extra tab before it closes an hour of your day.",
  "You can't think deeply and scroll at the same time — pick one.",
  "Depth beats duration. One focused pass beats three distracted ones.",
  "If your mind wandered, that's normal — just bring it back, don't scold it.",
  "A single-tasked hour is worth more than a multi-tasked morning.",
  "A mistake caught in practice is a mark saved in the exam.",
  "Revision is where marks are actually won, not in the first lecture.",
  "The chapter you avoid revising is the one that'll show up in the paper.",
  "Write down the mistake, or you'll make it again in three weeks.",
  "Understanding a mistake once beats solving ten similar problems blindly.",
  "The mistake book is more valuable than any coaching notes.",
  "Forgetting is normal. Spaced revision just works with that fact instead of against it.",
  "Re-reading isn't revision. Recalling without looking is.",
  "The problem you got wrong today is worth revisiting tomorrow, not next month.",
  "Every solved PYQ tells you something about the pattern, not just the answer.",
  "Confidence in an exam is just familiarity built ahead of time.",
  "A topic revised five times sticks. A topic read once fades.",
  "Test yourself before the test does.",
  "Silly mistakes are still mistakes — log them the same way.",
  "The gap between attempts is where the memory actually strengthens.",
  "Don't just fix the answer — figure out why you got it wrong in the first place.",
  "Old chapters decay quietly if you don't visit them. Go visit them.",
  "A wrong answer with a clear reason beats a right answer you can't explain.",
  "Revisit before you forget, not after.",
  "Your weakest chapter deserves your best hour, not your leftover one.",
  "A bad mock test is data, not a verdict.",
  "One rough week doesn't erase months of consistent work.",
  "Rank doesn't ask how today felt. It asks what you did.",
  "Tired is allowed. Quitting for the day isn't the same as quitting.",
  "The setback is real. So is your ability to adjust and continue.",
  "A low score today is information you didn't have yesterday — use it.",
  "You're allowed a bad day. You're not allowed a bad month.",
  "Every topper had a test that went badly. The difference is what happened after.",
  "Progress isn't a straight line — plateaus are part of the climb, not proof you've stopped.",
  "The comeback starts the next session, not next week.",
  "Frustration is fuel if you point it at the next attempt instead of at yourself.",
  "You don't need to feel ready. You need to start anyway.",
  "A dip in a mock score is a signal to adjust, not a reason to spiral.",
  "The exam doesn't remember your bad week. Neither should you, once it's logged and fixed.",
  "Recovering fast matters more than never stumbling.",
  "Every rank list has people who had a rough patch mid-preparation and still got there.",
  "Setbacks compound only if you let them steal tomorrow too.",
  "You are not behind. You are exactly where today's plan puts you.",
  "One tough paper doesn't define the next one.",
  "Keep the standard high, keep the judgment of yourself light.",
  "Your rank is decided against strangers. Your discipline is decided against yourself.",
  "Someone else's pace says nothing about your ceiling.",
  "Comparing your chapter 3 to someone else's chapter 9 wastes energy you could spend studying chapter 3.",
  "The only trend line that matters is your own, over time.",
  "Run your own race — the syllabus is the same for everyone, the path doesn't have to be.",
  "Other people's results are not your instructions.",
  "Stay in your own lane; it's the only one you can actually control.",
  "You don't need to be the fastest. You need to be the one who didn't stop.",
  "Somebody's highlight reel isn't their whole preparation — don't measure your full story against their best day.",
  "Focus on your yesterday's version of you, not today's version of someone else.",
  "A quiet, steady student almost always outlasts a loud, inconsistent one.",
  "You're not competing with the topper. You're competing with your own excuses.",
  "The comparison that actually helps is: better than last month, not better than them.",
  "Nobody's finished syllabus looked finished halfway through either.",
  "Watching someone else's streak doesn't build yours.",
  "The syllabus doesn't care about your mood. Start anyway.",
  "It's not that you lack talent. It's that talent without repetition rarely shows up on paper.",
  "The exam rewards preparation, not last-minute panic dressed up as effort.",
  "Confidence isn't a feeling you wait for. It's a byproduct of hours already logged.",
  "A hard topic is just an unfamiliar one — familiarity is buildable.",
  "You don't have to like a subject to get good at it. Repetition works either way.",
  "Boredom is often just what mastery feels like from the inside.",
  "The mountain looks smaller once you stop staring at the whole thing and look at today's step.",
  "Preparation removes the need for luck — it doesn't replace hard problems with easy ones.",
  "A calm mind solves more problems in an hour than a panicked one solves in three.",
  "Ambition without a plan is just a nice feeling. Pair the two.",
  "The score reflects the process, not the person — don't confuse the two.",
  "There is no version of this where hard work in silence doesn't eventually show up.",
  "Every difficult concept was once new to everyone who now finds it easy.",
  "Your future exam-day self is built entirely out of today's ordinary sessions.",
  "Patience with the syllabus is patience with your own timeline — both pay off.",
  "The work is rarely exciting. The results of the work usually are.",
  "Trust the process on the days it doesn't feel like it's working.",
  "A steady 6/10 effort every day beats a 10/10 effort every ten days.",
  "You get good at exams the same way you get good at anything — repetition, feedback, adjustment.",
  "One solved problem today is one step closer than yesterday.",
  "A chapter finished slowly is still a chapter finished.",
  "Write the formula from memory before you check it — that's where recall actually gets tested.",
  "The DPP you skip today becomes the gap you notice in the mock next week.",
  "Three focused problems teach more than ten skimmed ones.",
  "A short session done is worth more than a long session postponed.",
  "Timing yourself in practice removes the shock of timing yourself in the exam.",
  "The PYQ pattern repeats more than most students expect — study it like data, not trivia.",
  "Explaining a concept out loud to no one in particular reveals what you actually understand.",
  "A formula sheet reviewed for two minutes before sleep outlasts one read once and forgotten.",
  "Solve first, look at the solution second — not the other way round.",
  "Mixed practice, not just chapter-wise practice, is what mocks actually test.",
  "Speed comes after accuracy, never before it.",
  "A neat, wrong method is still worth reviewing — it shows you where the logic broke.",
  "Every topic has a 'why it works,' not just a 'how to do it' — chase the why too.",
  "Under-preparation shows up as panic. Over-preparation shows up as calm. Aim for the second.",
  "The two minutes spent re-reading the question carefully save the ten minutes spent solving the wrong one.",
  "A mock taken under real time pressure teaches more than five taken leisurely.",
  "Difficult chapters deserve more attempts, not more avoidance.",
  "Small daily question counts add up to large yearly totals — the math works in your favor.",
  "Review the mistake within the same week, not the same year.",
  "A clean, organized formula notebook saves panic in the last ten days before the exam.",
  "Every accurate small step beats a fast wrong leap.",
  "The first pass through a chapter is understanding. The fifth pass is mastery.",
  "Test conditions in practice make real exam conditions feel familiar, not frightening.",
  "How you start the morning tends to set the tone for the whole day's output.",
  "A clear first task of the day removes the paralysis of choosing one.",
  "The version of today that starts on time rarely regrets it by evening.",
  "Waking up on schedule protects the whole day's plan, not just breakfast.",
  "A quiet first hour, undistracted, is worth more than most of the noisy ones after.",
  "Morning revision is short, but it's often the stickiest part of the day.",
  "Routines aren't restrictive — they're what free up your willpower for harder decisions later.",
  "The way you handle the first task of the day usually predicts the rest of it.",
  "A late start can still be a good day — but an early one rarely hurts.",
  "Same wake time, same first task — boring, and exactly why it works.",
  "Rest isn't the opposite of discipline — burning out is.",
  "A tired mind studying six unfocused hours often learns less than a rested one studying three.",
  "Recovery is part of the plan, not a break from it.",
  "Sleep debt shows up on mock scores whether or not you notice it happening.",
  "A short walk clears more mental fog than another hour of forcing it.",
  "Taking an evening off on purpose beats burning out and losing the whole next week.",
  "The body keeps score even when the mind insists it's fine.",
  "Pushing through exhaustion for one more hour rarely beats stopping and returning fresh tomorrow.",
  "Balance isn't a reward for finishing — it's what keeps you able to keep going.",
  "A well-rested version of you solves problems faster than an exhausted one grinding longer.",
  "Protect the streak, not the mood.",
  "A missed day doesn't erase the ninety before it — but don't make it a habit either.",
  "The goal isn't a perfect week. It's a week you didn't quit on.",
  "Streaks aren't about perfection. They're about showing up again tomorrow regardless.",
  "A small task finished still counts — the streak doesn't grade on difficulty.",
  "Two days off compounds into more damage than either day alone.",
  "The easiest way to keep momentum is to never fully stop it in the first place.",
  "One check mark a day, repeated, becomes an entire prepared syllabus.",
  "Habits are just decisions you've already made — that's why they're easier than willpower.",
  "The chain of days matters more than any single link in it."
];
function quoteOfDay(){
  const start = new Date(new Date().getFullYear(),0,0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
}
const SHLOKAS = [
  { ref:"Chapter 2, Verse 47", sanskrit:"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥", translit:"karmanye vadhikaraste ma phaleshu kadachana, ma karma-phala-hetur bhur ma te sango 'stvakarmani",
    meaning:"You have a right to your effort, never to the result it produces. Don't work only for the outcome — and don't use that as an excuse to stop working either." },
  { ref:"Chapter 2, Verse 3", sanskrit:"क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते। क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥", translit:"klaibyam ma sma gamah partha naitat tvayy upapadyate, kshudram hridaya-daurbalyam tyaktvottishtha parantapa",
    meaning:"Don't give in to weakness — it doesn't suit you. Shake off this faintheartedness in your chest and rise." },
  { ref:"Chapter 6, Verse 5", sanskrit:"उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥", translit:"uddhared atmanatmanam natmanam avasadayet, atmaiva hy atmano bandhur atmaiva ripur atmanah",
    meaning:"Lift yourself up through your own effort — don't let yourself sink. You are your own best friend, and, if you let yourself slip, your own worst enemy." },
  { ref:"Chapter 2, Verse 48", sanskrit:"योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥", translit:"yogasthah kuru karmani sangam tyaktva dhananjaya, siddhy-asiddhyoh samo bhutva samatvam yoga uchyate",
    meaning:"Do your work with a steady mind, without clinging to the outcome. Staying even-tempered through success and failure alike — that steadiness is itself the discipline." },
  { ref:"Chapter 2, Verse 14", sanskrit:"मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥", translit:"matra-sparsas tu kaunteya sitoshna-sukha-duhkha-dah, agamapayino 'nityas tams titikshasva bharata",
    meaning:"Heat and cold, comfort and discomfort — they arrive, and they pass. Learn to sit with them without being shaken." },
  { ref:"Chapter 3, Verse 35", sanskrit:"श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥", translit:"shreyan swadharmo vigunah paradharmat swanushthitat, swadharme nidhanam shreyah paradharmo bhayavahah",
    meaning:"Doing your own work imperfectly beats doing someone else's task perfectly. Stay on your own path — comparing your chapter to someone else's syllabus only unsettles you." },
  { ref:"Chapter 2, Verses 62–63", sanskrit:"क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥", translit:"krodhad bhavati sammohah sammohat smriti-vibhramah, smriti-bhramsad buddhi-nasho buddhi-nasat pranashyati",
    meaning:"Frustration clouds judgment, clouded judgment erodes memory and focus, and once focus is gone, the whole effort falls apart. Catch the irritation early." },
  { ref:"Chapter 18, Verse 78", sanskrit:"यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥", translit:"yatra yogeshwarah krishno yatra partho dhanurdharah, tatra shrir vijayo bhutir dhruva nitir matir mama",
    meaning:"Where discipline and steady effort meet skill and preparation, success follows as a matter of course — not luck." },
  { ref:"Chapter 2, Verse 13", sanskrit:"देहिनोऽस्मिन् यथा देहे कौमारं यौवनं जरा। तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥", translit:"dehino 'smin yatha dehe kaumaram yauvanam jara, tatha dehantara-praptir dhiras tatra na muhyati",
    meaning:"Just as a body moves through childhood, youth, and old age, change is simply the nature of things. A steady mind doesn't panic over that kind of transition." },
  { ref:"Chapter 2, Verse 16", sanskrit:"नासतो विद्यते भावो नाभावो विद्यते सतः। उभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥", translit:"nasato vidyate bhavo nabhavo vidyate satah, ubhayor api drishto 'ntas tv anayos tattva-darshibhih",
    meaning:"What's temporary was never going to last, and what's real doesn't just vanish. Learning to tell the two apart is most of the work." },
  { ref:"Chapter 2, Verse 20", sanskrit:"न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥", translit:"na jayate mriyate va kadachin nayam bhutva bhavita va na bhuyah, ajo nityah shashvato 'yam purano na hanyate hanyamane sharire",
    meaning:"Some things are constant even while everything around them changes. Don't confuse a setback to the body of your effort with damage to the effort itself." },
  { ref:"Chapter 2, Verse 22", sanskrit:"वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥", translit:"vasamsi jirnani yatha vihaya navani grihnati naro 'parani, tatha shariraani vihaya jirnany anyani sanyati navani dehi",
    meaning:"Just like changing worn-out clothes for new ones, old habits and old routines can be swapped out for better ones without ceremony." },
  { ref:"Chapter 2, Verses 23–24", sanskrit:"नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥", translit:"nainam chhindanti shastrani nainam dahati pavakah, na chainam kledayanty apo na shoshayati marutah",
    meaning:"No weapon can cut it, no fire can burn it, no water can soak it, no wind can dry it out. Some things are simply beyond damage — build your effort like that." },
  { ref:"Chapter 2, Verse 27", sanskrit:"जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च। तस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि॥", translit:"jatasya hi dhruvo mrityur dhruvam janma mritasya cha, tasmad aparihaarye 'rthe na tvam shochitum arhasi",
    meaning:"Some things are simply certain and unavoidable. There's no point spending your energy grieving over what was never going to go differently." },
  { ref:"Chapter 2, Verse 38", sanskrit:"सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ। ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि॥", translit:"sukha-duhkhe same kritva labhalabhau jayajayau, tato yuddhaya yujyasva naivam papam avapsyasi",
    meaning:"Treat joy and disappointment, gain and loss, as roughly the same weight, then just do the work in front of you. That mindset alone keeps you steady." },
  { ref:"Chapter 2, Verse 41", sanskrit:"व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन। बहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥", translit:"vyavasayatmika buddhir ekeha kuru-nandana, bahu-shakha hy anantash cha buddhayo 'vyavasayinam",
    meaning:"A resolved, decided mind moves in one direction. A scattered, undecided mind branches out endlessly and gets nowhere in particular." },
  { ref:"Chapter 2, Verse 55", sanskrit:"प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान्। आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते॥", translit:"prajahati yada kaman sarvan partha mano-gatan, atmany evatmana tushtah sthita-prajnas tadochyate",
    meaning:"Someone whose contentment stops depending on chasing every craving that crosses the mind has actually found a steady footing." },
  { ref:"Chapter 2, Verse 56", sanskrit:"दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥", translit:"duhkheshv anudvigna-manah sukheshu vigata-sprihah, vita-raga-bhaya-krodhah sthita-dhir munir uchyate",
    meaning:"Not rattled by hardship, not desperate for pleasure, and free of clinging, fear, and anger — that's what an actually steady mind looks like." },
  { ref:"Chapter 2, Verse 57", sanskrit:"यः सर्वत्रानभिस्नेहस्तत्तत्प्राप्य शुभाशुभम्। नाभिनन्दति न द्वेष्टि तस्य प्रज्ञा प्रतिष्ठिता॥", translit:"yah sarvatr anabhisnehas tat tat prapya shubhashubham, nabhinandati na dveshti tasya prajna pratishthita",
    meaning:"Meeting good news and bad news without either grabbing at it or recoiling from it is a real sign that your footing has settled." },
  { ref:"Chapter 2, Verse 64", sanskrit:"रागद्वेषवियुक्तैस्तु विषयानिन्द्रियैश्चरन्। आत्मवश्यैर्विधेयात्मा प्रसादमधिगच्छति॥", translit:"raga-dvesha-vimuktais tu vishayan indriyaish charan, atma-vashyair vidheyatma prasadam adhigachchhati",
    meaning:"Moving through distractions without being pulled by attraction or aversion, keeping yourself in the driver's seat, is what actually produces calm." },
  { ref:"Chapter 2, Verse 70", sanskrit:"आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्। तद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी॥", translit:"apuryamanam achala-pratishtham samudram apah pravishanti yadvat, tadvat kama yam pravishanti sarve sa shantim apnoti na kama-kami",
    meaning:"Like rivers flowing into an ocean that stays full and unmoved, wants and distractions can flow past someone without disturbing them — that stillness is where peace actually shows up." },
  { ref:"Chapter 2, Verse 71", sanskrit:"विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः। निर्ममो निरहङ्कारः स शान्तिमधिगच्छति॥", translit:"vihaya kaman yah sarvan pumamsh charati nihsprihah, nirmamo nirahankarah sa shantim adhigachchhati",
    meaning:"Letting go of constant craving, moving without possessiveness or ego, is the actual shape peace takes — not the absence of effort, but the absence of grasping." },
  { ref:"Chapter 3, Verse 17", sanskrit:"यस्त्वात्मरतिरेव स्यादात्मतृप्तश्च मानवः। आत्मन्येव च सन्तुष्टस्तस्य कार्यं न विद्यते॥", translit:"yas tv atma-ratir eva syad atma-triptash cha manavah, atmany eva cha santushtas tasya karyam na vidyate",
    meaning:"Someone who has found real contentment within themselves isn't constantly chasing something outside to feel complete." },
  { ref:"Chapter 3, Verse 25", sanskrit:"सक्ताः कर्मण्यविद्वांसो यथा कुर्वन्ति भारत। कुर्याद्विद्वांस्तथासक्तश्चिकीर्षुर्लोकसंग्रहम्॥", translit:"saktah karmany avidvamso yatha kurvanti bharata, kuryad vidvams tathasaktash chikirshur loka-sangraham",
    meaning:"The unwise work because they're attached to the outcome. It's possible to do the same work, just as fully, without needing the attachment to get it done." },
  { ref:"Chapter 3, Verse 29", sanskrit:"प्रकृतेर्गुणसम्मूढाः सज्जन्ते गुणकर्मसु। तानकृत्स्नविदो मन्दान्कृत्स्नविन्न विचालयेत्॥", translit:"prakriter guna-sammudhah sajjante guna-karmasu, tan akritsna-vido mandan kritsna-vin na vichalayet",
    meaning:"People caught up in their own moods get attached to whatever those moods produce. No need to shake anyone out of it forcefully — just don't let it unsettle you either." },
  { ref:"Chapter 3, Verse 33", sanskrit:"सदृशं चेष्टते स्वस्याः प्रकृतेर्ज्ञानवानपि। प्रकृतिं यान्ति भूतानि निग्रहः किं करिष्यति॥", translit:"sadrisham cheshtate svasyah prakriter jnanavan api, prakritim yanti bhutani nigrahah kim karishyati",
    meaning:"Even someone who understands themselves well still acts according to their own nature. Working with your tendencies usually beats fighting them outright." },
  { ref:"Chapter 3, Verse 43", sanskrit:"एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना। जहि शत्रुं महाबाहो कामरूपं दुरासदम्॥", translit:"evam buddheh param buddhva sanstabhyatmanam atmana, jahi shatrum maha-baho kama-rupam durasadam",
    meaning:"Know that steady judgment outranks impulse, and use that judgment to hold yourself steady. Runaway craving is a tough opponent, but not an unbeatable one." },
  { ref:"Chapter 4, Verses 7–8", sanskrit:"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥ परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥", translit:"yada yada hi dharmasya glanir bhavati bharata, abhyutthanam adharmasya tadatmanam srijamy aham; paritranaya sadhunam vinashaya cha dushkritam, dharma-samsthapanarthaya sambhavami yuge yuge",
    meaning:"Whenever things drift too far off balance, a correction shows up — to protect what's working, address what's gone wrong, and reset toward balance again. The same pattern holds in a routine as in the story." }
];
function shlokaOfDay(){
  const start = new Date(new Date().getFullYear(),0,0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return SHLOKAS[dayOfYear % SHLOKAS.length];
}
function defaultRoutine(mode){
  if(mode==='on') return [
    ["05:30","Wake up + freshen up"],
    ["05:45","Quick formula / short-notes revision"],
    ["06:15","Get ready and leave for coaching"],
    ["07:00","Coaching classes"],
    ["13:00","Lunch + rest"],
    ["14:00","Homework / DPP from today's classes"],
    ["15:30","Short break"],
    ["16:00","Self-study — weak chapter or pending topic"],
    ["18:00","Snack break"],
    ["18:30","Practice questions / PYQs"],
    ["20:00","Dinner"],
    ["20:45","Spaced-repetition revision + mistake book review"],
    ["22:00","Plan tomorrow"],
    ["22:15","Sleep"]
  ].map(([time,activity])=>({id:uid(),time,activity}));
  return [
    ["06:00","Wake up"],
    ["06:15","Morning revision — formulas / quick recall"],
    ["07:00","Get ready + breakfast"],
    ["08:00","Deep study block 1 — new topic"],
    ["10:30","Break"],
    ["10:45","Deep study block 2 — practice + DPP"],
    ["13:00","Lunch + rest"],
    ["14:00","Mock test / PYQ practice"],
    ["16:00","Test analysis + mistake logging"],
    ["16:30","Break"],
    ["17:00","Weak chapter focus + due revisions"],
    ["19:00","Exercise / walk"],
    ["19:30","Dinner + relax"],
    ["20:30","Light revision / formula notebook"],
    ["22:00","Plan tomorrow + sleep"]
  ].map(([time,activity])=>({id:uid(),time,activity}));
}
function defaultTests(){
  // Empty by default — every student builds their own test schedule from the Practice tab.
  return [];
}
function defaultRewardCatalog(){
  return [
    {id:uid(), name:"Watch a movie / episode guilt-free", cost:40, monthlyLimit:0},
    {id:uid(), name:"Order favourite food", cost:80, monthlyLimit:2},
    {id:uid(), name:"Go to the park / outing", cost:60, monthlyLimit:1},
    {id:uid(), name:"Buy something small for myself", cost:120, monthlyLimit:1}
  ];
}
const SYLLABUS = {
  Physics: ["Units and Measurements","Kinematics","Laws of Motion","Work, Energy and Power","Rotational Motion","Gravitation","Mechanical Properties of Solids","Mechanical Properties of Fluids","Thermal Properties of Matter","Thermodynamics","Kinetic Theory of Gases","Oscillations","Waves","Electrostatics","Current Electricity","Magnetic Effects of Current","Magnetism and Matter","Electromagnetic Induction","Alternating Current","Electromagnetic Waves","Ray Optics","Wave Optics","Dual Nature of Matter and Radiation","Atoms","Nuclei","Semiconductor Electronics"],
  Chemistry: ["Some Basic Concepts of Chemistry","Structure of Atom","Classification of Elements & Periodicity","Chemical Bonding and Molecular Structure","States of Matter","Chemical Thermodynamics","Equilibrium","Redox Reactions","Hydrogen","s-Block Elements","p-Block Elements (Group 13-14)","Organic Chemistry — Basic Principles","Hydrocarbons","Solid State","Solutions","Electrochemistry","Chemical Kinetics","Surface Chemistry","p-Block Elements (Group 15-18)","d and f Block Elements","Coordination Compounds","Haloalkanes and Haloarenes","Alcohols, Phenols and Ethers","Aldehydes, Ketones and Carboxylic Acids","Amines","Biomolecules","Polymers","Chemistry in Everyday Life"],
  Mathematics: ["Sets, Relations and Functions","Complex Numbers","Quadratic Equations","Sequences and Series","Permutations and Combinations","Binomial Theorem","Trigonometry","Straight Lines","Conic Sections","Introduction to 3D Geometry","Limits and Derivatives","Mathematical Reasoning","Statistics","Probability","Matrices and Determinants","Continuity and Differentiability","Applications of Derivatives","Integrals","Applications of Integrals","Differential Equations","Vector Algebra","Three Dimensional Geometry","Linear Programming"]
};
const REV_GAPS = [1,3,7,15,30,60,120];
const SUBJ_COLOR = {Physics:"#5B7CFF", Chemistry:"#33D6A6", Mathematics:"#F5B84C"};

let state = { chapters: {}, mistakes: [], examDate: null, streak: {count:0, last:null}, dailyLogs: {}, settings: {hoursTarget:2, questionsTarget:20, focusWorkMin:25, focusBreakMin:5, rewardPointsPerHour:4, rewardWakeStart:"06:00", rewardWakeEnd:"07:00", rewardWakePoints:5, rewardNoPMOPoints:5}, routines: null, rewards: null, profile: null, tests: null, practice: null };
let currentSubject = "Physics";

function uid(){ return Math.random().toString(36).slice(2,9); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function daysBetween(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }

function freshChapter(subject, name){
  return { id: uid(), subject, name, lecture:false, notes:false, dpp:false, pyqMain:false, pyqAdv:false,
    lectureDate:null, revisions:[false,false,false,false,false,false,false], revisionDates:[null,null,null,null,null,null,null],
    strength:"moderate", questionsSolved:0, accuracy:0 };
}

function seedIfEmpty(){
  let any = false;
  for(const s in SYLLABUS){ if(state.chapters[s] && state.chapters[s].length) any = true; }
  if(any) return;
  for(const s in SYLLABUS){
    state.chapters[s] = SYLLABUS[s].map(n => freshChapter(s,n));
  }
}

async function storageGet(key){
  if(typeof window.storage !== 'undefined' && window.storage){
    try{ const r = await window.storage.get(key, false); if(r) return r; }catch(e){}
  }
  try{ const v = localStorage.getItem(key); return v!==null ? {value:v} : null; }catch(e){ return null; }
}
async function storageSet(key, val){
  if(typeof window.storage !== 'undefined' && window.storage){
    try{ await window.storage.set(key, val, false); return; }catch(e){}
  }
  try{ localStorage.setItem(key, val); }catch(e){}
}

async function load(){
  try{
    const r = await storageGet('jee-ascend-state');
    if(r && r.value) state = JSON.parse(r.value);
  }catch(e){}
  seedIfEmpty();
  if(!state.examDate){
    const d = new Date(); d.setMonth(d.getMonth()+6);
    state.examDate = d.toISOString().slice(0,10);
  }
  if(!state.streak) state.streak = {count:0,last:null};
  if(!state.mistakes) state.mistakes = [];
  if(!state.dailyLogs) state.dailyLogs = {};
  if(!state.settings) state.settings = {hoursTarget:2, questionsTarget:20, focusWorkMin:25, focusBreakMin:5};
  if(state.settings.focusWorkMin===undefined) state.settings.focusWorkMin = 25;
  if(state.settings.focusBreakMin===undefined) state.settings.focusBreakMin = 5;
  if(state.settings.rewardPointsPerHour===undefined) state.settings.rewardPointsPerHour = 4;
  if(state.settings.rewardWakeStart===undefined) state.settings.rewardWakeStart = "06:00";
  if(state.settings.rewardWakeEnd===undefined) state.settings.rewardWakeEnd = "07:00";
  if(state.settings.rewardWakePoints===undefined) state.settings.rewardWakePoints = 5;
  if(state.settings.rewardNoPMOPoints===undefined) state.settings.rewardNoPMOPoints = 5;
  if(!state.routines) state.routines = { on: defaultRoutine('on'), off: defaultRoutine('off') };
  if(!state.rewards) state.rewards = { points:0, catalog: defaultRewardCatalog(), redemptions: [] };
  if(!state.tests) state.tests = defaultTests();
  if(!state.practice) state.practice = { questions: [] };
  document.getElementById('examDate').value = state.examDate;
  save();
}
async function save(){
  await storageSet('jee-ascend-state', JSON.stringify(state));
  scheduleCloudSync();
}

// ---------- CLOUD SYNC (Firebase) ----------
// >>> PASTE YOUR FIREBASE PROJECT CONFIG HERE. Leave apiKey blank ('') to disable cloud sync entirely. <<<
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCCdPhja7dhsV70YeWvpMUbziP6pfM6-iQ",
  authDomain: "jee-ascend.firebaseapp.com",
  projectId: "jee-ascend",
  storageBucket: "jee-ascend.firebasestorage.app",
  messagingSenderId: "404497112359",
  appId: "1:404497112359:web:4a807aaa6d1dd177a6dd02",
  measurementId: "G-SH49VMJJ4Q"
};
let db = null;
if(FIREBASE_CONFIG.apiKey){
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
  }catch(e){ console.warn('Firebase init failed:', e); }
}
function cloudDocId(email){ return (email||'').trim().toLowerCase(); }

let cloudSyncTimer = null;
function scheduleCloudSync(){
  if(!db || !state.profile || !state.profile.email) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(()=>{ pushStateToCloud(); }, 4000);
}
async function pushStateToCloud(){
  if(!db || !state.profile || !state.profile.email) return;
  const id = cloudDocId(state.profile.email);
  if(!id) return;
  try{
    await db.collection('users').doc(id).set({
      data: JSON.stringify(state),
      updatedAt: new Date().toISOString()
    });
  }catch(e){ console.warn('Cloud sync failed:', e); }
}
async function pullStateFromCloud(email){
  if(!db) return null;
  const id = cloudDocId(email);
  if(!id) return null;
  try{
    const doc = await db.collection('users').doc(id).get();
    if(doc.exists) return JSON.parse(doc.data().data);
    return null;
  }catch(e){ console.warn('Cloud restore failed:', e); return null; }
}

function bumpStreak(){
  const t = todayStr();
  if(state.streak.last === t) return;
  const y = new Date(); y.setDate(y.getDate()-1);
  const yStr = y.toISOString().slice(0,10);
  state.streak.count = (state.streak.last === yStr) ? state.streak.count+1 : 1;
  state.streak.last = t;
}

function allChapters(){
  let arr = [];
  for(const s in state.chapters) arr = arr.concat(state.chapters[s]);
  return arr;
}

function chapterCompletion(c){
  const flags = [c.lecture,c.notes,c.dpp,c.pyqMain,c.pyqAdv];
  const doneFlags = flags.filter(Boolean).length;
  const revDone = c.revisions.filter(Boolean).length;
  return Math.round(((doneFlags/5)*0.6 + (revDone/7)*0.4)*100);
}

function subjectCompletion(s){
  const chs = state.chapters[s] || [];
  if(!chs.length) return 0;
  return Math.round(chs.reduce((a,c)=>a+chapterCompletion(c),0)/chs.length);
}

function overallCompletion(){
  const all = allChapters();
  if(!all.length) return 0;
  return Math.round(all.reduce((a,c)=>a+chapterCompletion(c),0)/all.length);
}

function computeRevisionStatus(c){
  // find next pending revision index
  const idx = c.revisions.findIndex(r => !r);
  if(idx === -1 || !c.lecture) return null;
  const due = c.revisionDates[idx];
  if(!due) return null;
  const daysTo = daysBetween(todayStr(), due);
  return { idx, due, daysTo, overdue: daysTo < 0, dueToday: daysTo === 0, upcoming: daysTo > 0 };
}

function markLectureDone(c){
  c.lecture = true;
  c.lectureDate = todayStr();
  const base = new Date();
  c.revisionDates = REV_GAPS.map(g => { const d = new Date(base); d.setDate(d.getDate()+g); return d.toISOString().slice(0,10); });
  save(); renderAll();
}

function markRevisionDone(c, idx){
  c.revisions[idx] = true;
  save(); renderAll();
}

// ---------- DAILY MISSION + STREAK ----------
function getLogForDate(dateStr){
  if(!state.dailyLogs[dateStr]) state.dailyLogs[dateStr] = { tasks: [], hours: 0, questions: 0, completed:false };
  return state.dailyLogs[dateStr];
}
function getTodayLog(){
  return getLogForDate(todayStr());
}
function missionProgress(){
  const log = getTodayLog();
  const parts = [];
  if(log.tasks.length){ parts.push(log.tasks.filter(t=>t.done).length / log.tasks.length); }
  if(state.settings.hoursTarget > 0){ parts.push(Math.min(1, log.hours / state.settings.hoursTarget)); }
  if(state.settings.questionsTarget > 0){ parts.push(Math.min(1, log.questions / state.settings.questionsTarget)); }
  if(!parts.length) return 100;
  return Math.round((parts.reduce((a,b)=>a+b,0) / parts.length) * 100);
}
function addCustomTask(){
  const input = document.getElementById('newTaskInput');
  const txt = input.value.trim();
  if(!txt) return;
  getTodayLog().tasks.push({id:uid(), text:txt, done:false});
  input.value = '';
  save(); renderDashboard();
}
function toggleCustomTask(id){
  const log = getTodayLog();
  const t = log.tasks.find(x=>x.id===id); t.done = !t.done;
  save(); renderDashboard();
}
function deleteCustomTask(id){
  const log = getTodayLog();
  log.tasks = log.tasks.filter(x=>x.id!==id);
  save(); renderDashboard();
}
function logHours(val){ getTodayLog().hours = Number(val)||0; save(); renderDashboard(); }
function logQuestions(val){ getTodayLog().questions = Number(val)||0; save(); renderDashboard(); }

function addTaskForDate(dateStr){
  const input = document.getElementById('weekTaskInput_'+dateStr);
  const txt = input.value.trim();
  if(!txt) return;
  getLogForDate(dateStr).tasks.push({id:uid(), text:txt, done:false});
  input.value = '';
  save(); renderPlanner();
  if(dateStr === todayStr()) renderDashboard();
}
function toggleTaskForDate(dateStr, id){
  const log = getLogForDate(dateStr);
  const t = log.tasks.find(x=>x.id===id); if(t) t.done = !t.done;
  save(); renderPlanner();
  if(dateStr === todayStr()) renderDashboard();
}
function deleteTaskForDate(dateStr, id){
  const log = getLogForDate(dateStr);
  log.tasks = log.tasks.filter(x=>x.id!==id);
  save(); renderPlanner();
  if(dateStr === todayStr()) renderDashboard();
}
function weekPlannerHTML(){
  let html = '';
  for(let i=0;i<7;i++){
    const d = new Date(); d.setDate(d.getDate()+i);
    const dateStr = d.toISOString().slice(0,10);
    const log = getLogForDate(dateStr);
    const label = i===0 ? 'Today' : i===1 ? 'Tomorrow' : d.toLocaleDateString('en-IN',{weekday:'long'});
    const dateLabel = d.toLocaleDateString('en-IN',{day:'numeric', month:'short'});
    html += `<div class="day-card ${i===0?'is-today':''}">
      <div class="day-label">${label}</div>
      <div class="day-date">${dateLabel}</div>
      <div class="task-add-row">
        <input id="weekTaskInput_${dateStr}" placeholder="Add a task" onkeydown="if(event.key==='Enter')addTaskForDate('${dateStr}')">
        <button onclick="addTaskForDate('${dateStr}')">+</button>
      </div>
      ${log.tasks.length ? log.tasks.map(t=>`
        <div class="task-item ${t.done?'on':''}">
          <div class="box ${t.done?'on':''}" onclick="toggleTaskForDate('${dateStr}','${t.id}')">${t.done?icon('check'):''}</div>
          <div class="txt">${t.text}</div>
          <button class="del" onclick="deleteTaskForDate('${dateStr}','${t.id}')">&times;</button>
        </div>`).join('') : `<div class="empty-day">Nothing planned yet</div>`}
    </div>`;
  }
  return html;
}
function closeToday(){
  const log = getTodayLog();
  if(missionProgress() < 100){
    if(!confirm("Today's mission isn't fully complete yet. Close it out anyway? This will still count toward your streak.")) return;
  }
  log.completed = true;
  bumpStreak();
  awardDailyPoints();
  save(); renderAll();
}
function heatmapHTML(){
  let html = '';
  for(let i=29;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    const cls = log && log.completed ? 'done' : (key === todayStr() ? '' : 'missed');
    html += `<div class="heat-cell ${cls}" title="${key}"></div>`;
  }
  return html;
}

// ---------- GENERIC HABIT TRACKING (self-discipline / call-length streaks) ----------
function setHabit(field, val){
  getTodayLog()[field] = val;
  save(); renderPersonalize();
}
function habitStreak(field){
  let streak = 0;
  for(let i=0;;i++){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    if(log && log[field] === true) streak++;
    else break;
  }
  return streak;
}
function habitHeatmapHTML(field){
  let html = '';
  for(let i=29;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    let cls = '';
    if(log && log[field] === true) cls = 'done';
    else if(log && log[field] === false) cls = 'missed';
    html += `<div class="heat-cell ${cls}" title="${key}"></div>`;
  }
  return html;
}

// ---------- CHARTS ----------
function wakeTimeChartHTML(){
  let bars = '';
  for(let i=13;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    const label = d.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
    if(log && log.wakeTime){
      const [h,m] = log.wakeTime.split(':').map(Number);
      const mins = h*60+m;
      const early = 300, late = 600;
      const pct = Math.max(4, Math.min(100, Math.round((late-mins)/(late-early)*100)));
      const color = mins<=420 ? 'var(--green)' : mins<=480 ? 'var(--amber)' : 'var(--red)';
      bars += `<div class="chart-bar-col"><div class="chart-bar" style="height:${pct}%;background:${color}" title="${key}: ${log.wakeTime}"></div><div class="chart-bar-label">${label}</div></div>`;
    } else {
      bars += `<div class="chart-bar-col"><div class="chart-bar" style="height:3%;background:var(--line)" title="${key}: no data"></div><div class="chart-bar-label">${label}</div></div>`;
    }
  }
  return bars;
}
function studyHoursChart(){
  let bars = '', total = 0, count = 0;
  for(let i=29;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    const hrs = log ? (log.hours||0) : 0;
    if(log && log.hours) { total += hrs; count++; }
    const label = d.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
    const pct = Math.max(3, Math.min(100, Math.round(hrs/12*100)));
    const color = hrs>=6 ? 'var(--green)' : hrs>=3 ? 'var(--amber)' : hrs>0 ? 'var(--accent)' : 'var(--line)';
    bars += `<div class="chart-bar-col"><div class="chart-bar" style="height:${pct}%;background:${color}" title="${key}: ${hrs}h"></div><div class="chart-bar-label">${label}</div></div>`;
  }
  const avg = count ? (total/count).toFixed(1) : 0;
  return { bars, avg, count };
}

// ---------- REWARDS ----------
function todaysPotentialPoints(log){
  let pts = 0;
  pts += Math.round((log.hours||0) * state.settings.rewardPointsPerHour);
  if(log.wakeTime && log.wakeTime >= state.settings.rewardWakeStart && log.wakeTime <= state.settings.rewardWakeEnd) pts += state.settings.rewardWakePoints;
  if(log.noPMO === true) pts += state.settings.rewardNoPMOPoints;
  return pts;
}
function awardDailyPoints(){
  const log = getTodayLog();
  if(log.pointsAwarded) return;
  const earned = todaysPotentialPoints(log);
  log.pointsAwarded = true;
  log.pointsEarned = earned;
  state.rewards.points += earned;
}
function addRewardItem(){
  const name = document.getElementById('newRewardName').value.trim();
  const cost = Number(document.getElementById('newRewardCost').value) || 0;
  const limit = Number(document.getElementById('newRewardLimit').value) || 0;
  if(!name || cost<=0) return;
  state.rewards.catalog.push({id:uid(), name, cost, monthlyLimit:limit});
  document.getElementById('newRewardName').value='';
  document.getElementById('newRewardCost').value='';
  document.getElementById('newRewardLimit').value='';
  save(); renderPersonalize();
}
function deleteRewardItem(id){
  state.rewards.catalog = state.rewards.catalog.filter(r=>r.id!==id);
  save(); renderPersonalize();
}
function redeemReward(id){
  const r = state.rewards.catalog.find(x=>x.id===id);
  if(!r) return;
  const usedThisMonth = state.rewards.redemptions.filter(x=>x.rewardId===id && x.date.slice(0,7)===todayStr().slice(0,7)).length;
  if(r.monthlyLimit>0 && usedThisMonth>=r.monthlyLimit) return;
  if(state.rewards.points < r.cost) return;
  state.rewards.points -= r.cost;
  state.rewards.redemptions.push({id:uid(), rewardId:id, date:todayStr(), cost:r.cost});
  save(); renderPersonalize();
}
function rewardsSectionHTML(log){
  const potential = todaysPotentialPoints(log);
  const catalogHTML = state.rewards.catalog.map(r=>{
    const usedThisMonth = state.rewards.redemptions.filter(x=>x.rewardId===r.id && x.date.slice(0,7)===todayStr().slice(0,7)).length;
    const limitReached = r.monthlyLimit>0 && usedThisMonth>=r.monthlyLimit;
    const canAfford = state.rewards.points >= r.cost;
    return `<div class="reward-item">
      <div class="rname">${r.name}<div class="rlimit">${r.monthlyLimit>0 ? usedThisMonth+'/'+r.monthlyLimit+' used this month' : 'no monthly limit'}</div></div>
      <div class="rcost">${r.cost} pts</div>
      <button class="redeem-btn" ${(!canAfford||limitReached)?'disabled':''} onclick="redeemReward('${r.id}')">${limitReached?'Limit reached':'Redeem'}</button>
      <button class="del" onclick="deleteRewardItem('${r.id}')">&times;</button>
    </div>`;
  }).join('') || `<div class="empty">No rewards set up yet — add one below.</div>`;
  const redemptionLog = state.rewards.redemptions.slice(-8).reverse().map(r=>{
    const item = state.rewards.catalog.find(c=>c.id===r.rewardId);
    return `<div class="redeem-log-row">${r.date} — ${item?item.name:'(removed reward)'} · ${r.cost} pts</div>`;
  }).join('') || `<div class="empty">No redemptions yet.</div>`;

  return `<div class="section-title">Rewards</div>
  <div class="rewards-hero">
    <div><div class="pagesub">Total points</div><div class="rewards-points">${state.rewards.points}</div></div>
    <div style="text-align:right"><div class="pagesub">Today's potential</div><div style="font-family:var(--mono);font-size:20px;color:var(--green)">+${potential}</div><div class="pagesub" style="font-size:10.5px">credited when you close out the day</div></div>
  </div>
  <div class="card">
    ${catalogHTML}
    <div class="reward-add-row">
      <input id="newRewardName" placeholder="Reward name">
      <input id="newRewardCost" type="number" placeholder="Cost (pts)">
      <input id="newRewardLimit" type="number" placeholder="Monthly limit (0 = none)">
      <button onclick="addRewardItem()">Add</button>
    </div>
  </div>
  <div class="section-title">Redemption history</div>
  <div class="card">${redemptionLog}</div>`;
}

function ring(pct, size=64, stroke=6){
  const r = (size-stroke)/2, c = 2*Math.PI*r;
  const off = c - (pct/100)*c;
  return `<div class="ring" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}"><circle class="bg" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}" fill="none"/>
    <circle class="fg" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>
    <div class="pct">${pct}%</div></div>`;
}

function icon(name){
  const map = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
  };
  return map[name] || '';
}

// ---------- DASHBOARD ----------
function renderDashboard(){
  const el = document.getElementById('view-dashboard');
  const all = allChapters();
  const overall = overallCompletion();
  const due = all.map(c=>({c, st: computeRevisionStatus(c)})).filter(x=>x.st && (x.st.overdue||x.st.dueToday));
  const overdue = due.filter(x=>x.st.overdue);
  const notStarted = all.filter(c=>!c.lecture).slice(0,5);
  const weak = all.filter(c=>c.strength==='weak');
  const log = getTodayLog();
  const progress = missionProgress();
  const closedToday = log.completed;

  let html = `<div class="mission-card">
    <div class="mission-card-top">
      <div>
        <div class="mission-card-title">Today's mission</div>
        <div class="pagesub" style="margin-top:2px">Add your own tasks, set targets, then close out the day to keep your streak.</div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div class="mission-progress-wrap">
          <div class="mission-progress-bar"><div style="width:${progress}%"></div></div>
          <div class="mission-progress-txt">${progress}%</div>
        </div>
        <button class="close-day-btn ${closedToday?'done':''}" onclick="closeToday()">${closedToday? 'Day closed ✓' : 'Close out today'}</button>
      </div>
    </div>

    <div class="task-add-row">
      <input id="newTaskInput" placeholder="Add a task for today (e.g. 30 physics MCQs)" onkeydown="if(event.key==='Enter')addCustomTask()">
      <button onclick="addCustomTask()">Add</button>
    </div>
    ${log.tasks.length ? log.tasks.map(t=>`
      <div class="task-item ${t.done?'on':''}">
        <div class="box ${t.done?'on':''}" onclick="toggleCustomTask('${t.id}')">${t.done?icon('check'):''}</div>
        <div class="txt">${t.text}</div>
        <button class="del" onclick="deleteCustomTask('${t.id}')">&times;</button>
      </div>`).join('') : ''}

    <div class="targets-row">
      <div class="target-box"><span class="tlbl">Study hours</span><input type="number" step="0.5" value="${log.hours}" onchange="logHours(this.value)"><span class="slash">/ ${state.settings.hoursTarget}</span></div>
      <div class="target-box"><span class="tlbl">Questions</span><input type="number" value="${log.questions}" onchange="logQuestions(this.value)"><span class="slash">/ ${state.settings.questionsTarget}</span></div>
      <div class="target-box"><span class="tlbl">Streak</span><span style="font-family:var(--mono);font-weight:600;color:var(--amber)">${state.streak.count} 🔥</span></div>
    </div>

    <div style="margin-top:16px">
      <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Last 30 days</div>
      <div class="heatmap">${heatmapHTML()}</div>
    </div>
  </div>`;

  html += `<div class="grid grid-4">
    <div class="card stat"><div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 16l4-6 3 3 5-8"/></svg></div><div class="lbl">Overall completion</div><div class="val">${overall}%</div><div class="sub">${all.length} chapters tracked</div></div>
    <div class="card stat"><div class="stat-icon ${overdue.length?'icon-red':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div><div class="lbl">Revisions due</div><div class="val" style="color:${overdue.length?'var(--red)':'var(--text)'}">${due.length}</div><div class="sub">${overdue.length} overdue</div></div>
    <div class="card stat"><div class="stat-icon icon-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L2.5 17a1.7 1.7 0 001.5 2.6h16a1.7 1.7 0 001.5-2.6L13.7 3.9a1.7 1.7 0 00-3.4 0z"/></svg></div><div class="lbl">Weak chapters</div><div class="val" style="color:var(--red)">${weak.length}</div><div class="sub">flagged for extra focus</div></div>
    <div class="card stat"><div class="stat-icon icon-amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s6 6.5 6 11a6 6 0 01-12 0c0-2 1-3.5 2-5"/></svg></div><div class="lbl">Longest this run</div><div class="val">${state.streak.count} d</div><div class="sub">tune targets in Settings</div></div>
  </div>`;

  html += `<div class="section-title">Subject progress</div><div class="grid grid-3">`;
  for(const s in SYLLABUS){
    html += `<div class="card" style="display:flex;align-items:center;gap:14px">
      ${ring(subjectCompletion(s),56,5)}
      <div><div style="font-weight:600;font-size:14px">${s}</div><div class="sub" style="color:var(--text-3);font-size:11.5px">${state.chapters[s].filter(c=>c.lecture).length}/${state.chapters[s].length} lectures done</div></div>
    </div>`;
  }
  html += `</div>`;

  html += `<div class="section-title">Today's mission <span class="count">${due.length + notStarted.length} items</span></div>`;
  if(due.length===0 && notStarted.length===0){
    html += `<div class="empty">Nothing due today. Pick a fresh chapter from Subjects, or get ahead on tomorrow's revisions.</div>`;
  } else {
    due.sort((a,b)=>a.st.daysTo-b.st.daysTo).forEach(x=>{
      html += `<div class="mission-row">
        <span class="tag ${x.st.overdue?'tag-overdue':'tag-due'}">${x.st.overdue? Math.abs(x.st.daysTo)+'d overdue' : 'due today'}</span>
        <div style="flex:1"><div class="name">${x.c.name}</div><div class="sub">${x.c.subject} · Revision ${x.st.idx+1} of 7</div></div>
        <button onclick="markRevisionDone(state.chapters['${x.c.subject}'].find(c=>c.id==='${x.c.id}'), ${x.st.idx})">Mark done</button>
      </div>`;
    });
    notStarted.forEach(c=>{
      html += `<div class="mission-row">
        <span class="tag tag-new">not started</span>
        <div style="flex:1"><div class="name">${c.name}</div><div class="sub">${c.subject} · lecture pending</div></div>
        <button onclick="markLectureDone(state.chapters['${c.subject}'].find(x=>x.id==='${c.id}'))">Mark lecture done</button>
      </div>`;
    });
  }
  el.innerHTML = html;
}

// ---------- SUBJECTS ----------
function toggleField(chId, subject, field){
  const c = state.chapters[subject].find(x=>x.id===chId);
  if(field==='lecture' && !c.lecture){ markLectureDone(c); return; }
  c[field] = !c[field];
  save(); renderSubjects();
}
function setStrength(chId, subject, val){
  state.chapters[subject].find(x=>x.id===chId).strength = val;
  save(); renderSubjects();
}
function setStat(chId, subject, field, val){
  state.chapters[subject].find(x=>x.id===chId)[field] = Number(val)||0;
  save();
}
function toggleChapter(el){ el.classList.toggle('open'); }
function addCustomChapter(){
  const input = document.getElementById('newChapterInput');
  const name = input.value.trim();
  if(!name) return;
  state.chapters[currentSubject].push(freshChapter(currentSubject, name));
  save(); renderSubjects();
}
function deleteChapter(chId, subject){
  if(!confirm("Remove this chapter and all its tracked progress? This can't be undone.")) return;
  state.chapters[subject] = state.chapters[subject].filter(x=>x.id!==chId);
  save(); renderAll();
}

function renderSubjects(){
  const el = document.getElementById('view-subjects');
  let tabs = `<div class="subject-tabs">`;
  for(const s in SYLLABUS){
    tabs += `<div class="subject-tab ${s===currentSubject?'active':''}" onclick="currentSubject='${s}';renderSubjects()">${s} · ${subjectCompletion(s)}%</div>`;
  }
  tabs += `</div>`;
  tabs += `<div class="add-chapter-row">
    <input id="newChapterInput" placeholder="Add a custom chapter to ${currentSubject}" onkeydown="if(event.key==='Enter')addCustomChapter()">
    <button onclick="addCustomChapter()">Add chapter</button>
  </div>`;

  let list = '';
  (state.chapters[currentSubject]||[]).forEach(c=>{
    const pct = chapterCompletion(c);
    const st = computeRevisionStatus(c);
    const sdot = c.strength==='weak'?'s-weak':c.strength==='strong'?'s-strong':'s-mod';
    list += `<div class="chapter" id="ch-${c.id}">
      <div class="chapter-head" onclick="toggleChapter(document.getElementById('ch-${c.id}'))">
        <span class="strength-dot ${sdot}"></span>
        <div class="name">${c.name}</div>
        ${st ? `<span class="meta" style="color:${st.overdue?'var(--red)':'var(--amber)'}">${st.overdue?Math.abs(st.daysTo)+'d overdue':st.dueToday?'due today':'rev in '+st.daysTo+'d'}</span>` : ''}
        <div class="bar"><div style="width:${pct}%"></div></div>
        <span class="meta">${pct}%</span>
        <button class="chapter-trash" onclick="event.stopPropagation();deleteChapter('${c.id}','${currentSubject}')">&times;</button>
        <span class="chevron">${icon('chevron')}</span>
      </div>
      <div class="chapter-body">
        <div class="check-row">
          ${['lecture','notes','dpp','pyqMain','pyqAdv'].map(f=>{
            const labels={lecture:'Lecture',notes:'Notes',dpp:'DPP',pyqMain:'PYQ Main',pyqAdv:'PYQ Advanced'};
            return `<div class="chk ${c[f]?'on':''}" onclick="toggleField('${c.id}','${currentSubject}','${f}')">${icon('check')} ${labels[f]}</div>`;
          }).join('')}
        </div>
        <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">Spaced revision (day 1 / 3 / 7 / 15 / 30 / 60 / 120)</div>
        <div class="rev-track">
          ${c.revisions.map((done,i)=>{
            const isDue = !done && c.lecture && st && st.idx===i;
            return `<div class="rev-node ${done?'done':isDue?'due':''}" onclick="${c.lecture?`markRevisionDone(state.chapters['${currentSubject}'].find(x=>x.id==='${c.id}'),${i})`:''}">R${i+1}</div>`;
          }).join('')}
        </div>
        <div class="field-row">
          <div class="field"><label>Strength</label>
            <select onchange="setStrength('${c.id}','${currentSubject}',this.value)">
              <option value="weak" ${c.strength==='weak'?'selected':''}>Weak</option>
              <option value="moderate" ${c.strength==='moderate'?'selected':''}>Moderate</option>
              <option value="strong" ${c.strength==='strong'?'selected':''}>Strong</option>
            </select>
          </div>
          <div class="field"><label>Questions solved</label><input type="number" value="${c.questionsSolved}" onchange="setStat('${c.id}','${currentSubject}','questionsSolved',this.value)"></div>
          <div class="field"><label>Accuracy %</label><input type="number" value="${c.accuracy}" onchange="setStat('${c.id}','${currentSubject}','accuracy',this.value)"></div>
        </div>
      </div>
    </div>`;
  });
  el.innerHTML = tabs + list;
}

// ---------- PLANNER ----------
function renderPlanner(){
  const el = document.getElementById('view-planner');
  const all = allChapters();
  const due = all.map(c=>({c,st:computeRevisionStatus(c)})).filter(x=>x.st && (x.st.overdue||x.st.dueToday)).sort((a,b)=>a.st.daysTo-b.st.daysTo);
  const upcoming = all.map(c=>({c,st:computeRevisionStatus(c)})).filter(x=>x.st && x.st.upcoming && x.st.daysTo<=3).sort((a,b)=>a.st.daysTo-b.st.daysTo);
  const fresh = all.filter(c=>!c.lecture).slice(0,3);
  const weakFocus = all.filter(c=>c.strength==='weak' && c.lecture).slice(0,3);

  let html = `<div class="section-title" style="margin-top:0">Plan your week <span class="count">tap + on any day</span></div>`;
  html += `<div class="week-grid">${weekPlannerHTML()}</div>`;

  html += `<div class="section-title">Revisions due today / overdue <span class="count">${due.length}</span></div>`;
  html += due.length ? due.map(x=>`<div class="mission-row"><span class="tag ${x.st.overdue?'tag-overdue':'tag-due'}">${x.st.overdue?Math.abs(x.st.daysTo)+'d overdue':'today'}</span><div style="flex:1"><div class="name">${x.c.name}</div><div class="sub">${x.c.subject} · Revision ${x.st.idx+1}</div></div><button onclick="markRevisionDone(state.chapters['${x.c.subject}'].find(c=>c.id==='${x.c.id}'),${x.st.idx})">Mark done</button></div>`).join('') : `<div class="empty">All caught up on revisions.</div>`;

  html += `<div class="section-title">New chapter to start</div>`;
  html += fresh.length ? fresh.map(c=>`<div class="mission-row"><span class="tag tag-new">start</span><div style="flex:1"><div class="name">${c.name}</div><div class="sub">${c.subject}</div></div><button onclick="markLectureDone(state.chapters['${c.subject}'].find(x=>x.id==='${c.id}'))">Start lecture</button></div>`).join('') : `<div class="empty">Every chapter has a lecture logged.</div>`;

  html += `<div class="section-title">Weak-chapter focus block</div>`;
  html += weakFocus.length ? weakFocus.map(c=>`<div class="mission-row"><span class="tag tag-overdue">weak</span><div style="flex:1"><div class="name">${c.name}</div><div class="sub">${c.subject} · do 15-20 extra questions</div></div></div>`).join('') : `<div class="empty">No chapters currently flagged weak — nice.</div>`;

  html += `<div class="section-title">Coming up in the next 3 days</div>`;
  html += upcoming.length ? upcoming.map(x=>`<div class="mission-row"><span class="tag tag-new">in ${x.st.daysTo}d</span><div style="flex:1"><div class="name">${x.c.name}</div><div class="sub">${x.c.subject} · Revision ${x.st.idx+1}</div></div></div>`).join('') : `<div class="empty">Nothing scheduled in the next 3 days.</div>`;

  el.innerHTML = html;
}

// ---------- MISTAKE BOOK ----------
function addMistake(){
  const subject = document.getElementById('mSubject').value;
  const chapter = document.getElementById('mChapter').value.trim();
  const type = document.getElementById('mType').value;
  const note = document.getElementById('mNote').value.trim();
  if(!chapter || !note) return;
  state.mistakes.unshift({id:uid(), subject, chapter, type, note, fixed:false, date:todayStr()});
  document.getElementById('mChapter').value=''; document.getElementById('mNote').value='';
  save(); renderMistakes();
}
function toggleFixed(id){
  const m = state.mistakes.find(x=>x.id===id); m.fixed = !m.fixed; save(); renderMistakes();
}
function deleteMistake(id){
  state.mistakes = state.mistakes.filter(x=>x.id!==id); save(); renderMistakes();
}
function renderMistakes(){
  const el = document.getElementById('view-mistakes');
  let opts = ''; for(const s in SYLLABUS) opts += `<option value="${s}">${s}</option>`;
  let html = `<div class="mistake-form">
    <select id="mSubject">${opts}</select>
    <input id="mChapter" placeholder="Chapter or topic">
    <select id="mType"><option value="concept">Conceptual gap</option><option value="silly">Silly mistake</option><option value="guess">Guesswork</option></select>
    <input id="mNote" placeholder="What went wrong, and the correct approach">
    <button onclick="addMistake()">Add</button>
  </div>`;
  if(!state.mistakes.length) html += `<div class="empty">No mistakes logged yet. Add one right after you review a test.</div>`;
  state.mistakes.forEach(m=>{
    const pillClass = m.type==='concept'?'pill-concept':m.type==='silly'?'pill-silly':'pill-guess';
    const pillLabel = m.type==='concept'?'Concept':m.type==='silly'?'Silly':'Guesswork';
    html += `<div class="mistake-item ${m.fixed?'fixed':''}">
      <div class="body">
        <div class="top"><span class="pill ${pillClass}">${pillLabel}</span><span style="font-size:12px;color:var(--text-3)">${m.subject} · ${m.chapter}</span></div>
        <div class="note">${m.note}</div>
      </div>
      <button class="fixbtn" onclick="toggleFixed('${m.id}')">${m.fixed?'Fixed':'Mark fixed'}</button>
      <button class="del" onclick="deleteMistake('${m.id}')">&times;</button>
    </div>`;
  });
  el.innerHTML = html;
}

// ---------- ANALYTICS ----------
function renderAnalytics(){
  const el = document.getElementById('view-analytics');
  const all = allChapters();
  const strengthCounts = {weak:0,moderate:0,strong:0};
  all.forEach(c=>strengthCounts[c.strength]++);
  const totalQ = all.reduce((a,c)=>a+(c.questionsSolved||0),0);
  const avgAcc = all.filter(c=>c.accuracy>0).length ? Math.round(all.filter(c=>c.accuracy>0).reduce((a,c)=>a+c.accuracy,0)/all.filter(c=>c.accuracy>0).length) : 0;
  const mistakeTypes = {concept:0,silly:0,guess:0};
  state.mistakes.forEach(m=>mistakeTypes[m.type]++);

  let html = `<div class="grid grid-4">
    <div class="card stat"><div class="lbl">Questions solved</div><div class="val">${totalQ}</div></div>
    <div class="card stat"><div class="lbl">Avg accuracy</div><div class="val">${avgAcc}%</div></div>
    <div class="card stat"><div class="lbl">Mistakes logged</div><div class="val">${state.mistakes.length}</div></div>
    <div class="card stat"><div class="lbl">Unfixed mistakes</div><div class="val" style="color:var(--red)">${state.mistakes.filter(m=>!m.fixed).length}</div></div>
  </div>`;

  const sh = studyHoursChart();
  html += `<div class="section-title">Daily study hours <span class="count">last 30 days</span></div><div class="card">
    <div class="chart-wrap">${sh.bars}</div>
    <div class="chart-avg-line">Average ${sh.avg}h/day across ${sh.count} logged day${sh.count===1?'':'s'} · green = 6h+, amber = 3-6h, blue = under 3h</div>
  </div>`;

  html += `<div class="section-title">Subject completion</div><div class="card">`;
  for(const s in SYLLABUS){
    const pct = subjectCompletion(s);
    html += `<div class="hbar-wrap"><div class="hbar-label">${s}</div><div class="hbar"><div style="width:${pct}%;background:${SUBJ_COLOR[s]}"></div></div><div class="hbar-val">${pct}%</div></div>`;
  }
  html += `</div>`;

  html += `<div class="section-title">Chapter strength distribution</div><div class="card">
    <div class="hbar-wrap"><div class="hbar-label">Weak</div><div class="hbar"><div style="width:${all.length?strengthCounts.weak/all.length*100:0}%;background:var(--red)"></div></div><div class="hbar-val">${strengthCounts.weak}</div></div>
    <div class="hbar-wrap"><div class="hbar-label">Moderate</div><div class="hbar"><div style="width:${all.length?strengthCounts.moderate/all.length*100:0}%;background:var(--amber)"></div></div><div class="hbar-val">${strengthCounts.moderate}</div></div>
    <div class="hbar-wrap"><div class="hbar-label">Strong</div><div class="hbar"><div style="width:${all.length?strengthCounts.strong/all.length*100:0}%;background:var(--green)"></div></div><div class="hbar-val">${strengthCounts.strong}</div></div>
  </div>`;

  html += `<div class="section-title">Mistake pattern</div><div class="card">
    <div class="hbar-wrap"><div class="hbar-label">Conceptual</div><div class="hbar"><div style="width:${state.mistakes.length?mistakeTypes.concept/state.mistakes.length*100:0}%;background:var(--red)"></div></div><div class="hbar-val">${mistakeTypes.concept}</div></div>
    <div class="hbar-wrap"><div class="hbar-label">Silly</div><div class="hbar"><div style="width:${state.mistakes.length?mistakeTypes.silly/state.mistakes.length*100:0}%;background:var(--amber)"></div></div><div class="hbar-val">${mistakeTypes.silly}</div></div>
    <div class="hbar-wrap"><div class="hbar-label">Guesswork</div><div class="hbar"><div style="width:${state.mistakes.length?mistakeTypes.guess/state.mistakes.length*100:0}%;background:var(--accent)"></div></div><div class="hbar-val">${mistakeTypes.guess}</div></div>
  </div>`;

  el.innerHTML = html;
}

// ---------- FOCUS Auido ----------
const focusMusic = new Audio();

focusMusic.loop = true;

const focusTracks = {
    Devotinoal : "music/radha.mp3",
    white : "music/Sitar.mp3",
    romantic : "music/Romatic.mp3"
};

let musicSettings = {
    enabled: JSON.parse(localStorage.getItem("musicEnabled") || "true"),
    muted: JSON.parse(localStorage.getItem("musicMuted") || "false"),
    volume: Number(localStorage.getItem("musicVolume") || 0.4),
    track: localStorage.getItem("musicTrack") || "Devotinoal"
};

focusMusic.src = focusTracks[musicSettings.track];
focusMusic.volume = musicSettings.volume;
focusMusic.muted = musicSettings.muted;

//___________FOCUS TIMER____________
let focusTimer = { mode:'focus', remainingSec:25*60, running:false, intervalId:null, initialized:false };

function ensureFocusTimer(){
  if(focusTimer.initialized) return;
  focusTimer.remainingSec = state.settings.focusWorkMin*60;
  focusTimer.initialized = true;
}

function playFocusMusic(){

    if(!musicSettings.enabled) return;

    focusMusic.play().catch(err=>{
        console.log(err);
    });

}

function pauseFocusMusic(){

    focusMusic.pause();

}

function toggleMusic(){

    if(focusMusic.paused){
        playFocusMusic();
    }else{
        pauseFocusMusic();
    }

}

function pauseFocusMusic(){

    focusMusic.pause();

}

function changeTrack(track){

    musicSettings.track = track;

    localStorage.setItem("musicTrack",track);

    focusMusic.src = focusTracks[track];

    if(focusTimer.running){

        focusMusic.play();

    }

}

function toggleMute(){

    musicSettings.muted=!musicSettings.muted;

    focusMusic.muted=musicSettings.muted;

    localStorage.setItem(
        "musicMuted",
        musicSettings.muted
    );

}

function changeVolume(value){

    focusMusic.volume=value;

    musicSettings.volume=value;

    localStorage.setItem(
        "musicVolume",
        value
    );

}
function playBeep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 880;
    o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.5);
    o.start(); o.stop(ctx.currentTime+0.55);
  }catch(e){}
}
function focusTotalSec(){ return (focusTimer.mode==='focus' ? state.settings.focusWorkMin : state.settings.focusBreakMin) * 60; }
function toggleFocusTimer(){ focusTimer.running ? pauseFocusTimer() : startFocusTimer(); }
function syncFocusGlow(){
  const glow = document.getElementById('focusGlow');
  if(!glow) return;
  glow.classList.toggle('active', focusTimer.running);
  glow.classList.toggle('on-break', focusTimer.mode === 'break');
}
function startFocusTimer(){

    if(focusTimer.running) return;

    focusTimer.running = true;

      playFocusMusic();

      // Notification when focus starts
showNotification(
    "🎯 Focus Started",
    `Stay locked in for ${state.settings.focusWorkMin} minutes.`
);

// Reminder for break (uses user's break duration)
if(window.breakReminder){
    clearTimeout(window.breakReminder);
}

window.breakReminder = setTimeout(() => {

    showNotification(
        "☕ Break Time",
        `Take a ${state.settings.focusBreakMin}-minute break and recharge.`
    );

}, state.settings.focusWorkMin * 60 * 1000);
    // Save finish time
    focusTimer.endTime = Date.now() + focusTimer.remainingSec * 1000;

    localStorage.setItem(
        "focusEndTime",
        focusTimer.endTime
    );

    localStorage.setItem(
        "focusRunning",
        "true"
    );

    focusTimer.intervalId = setInterval(()=>{

        const remaining = Math.ceil(
            (focusTimer.endTime - Date.now()) / 1000
        );

        focusTimer.remainingSec = Math.max(0, remaining);

        if(focusTimer.remainingSec <= 0){
            completeFocusSession();
        }else{
            updateFocusDisplay();
        }

    },1000);

    updateFocusButtons();

    syncFocusGlow();

}
function pauseFocusTimer(){
  if(window.breakReminder){
    clearTimeout(window.breakReminder);
}
  focusTimer.running = false;
  pauseFocusMusic();
  clearInterval(focusTimer.intervalId);

  localStorage.removeItem("focusEndTime");
  localStorage.removeItem("focusRunning");
  
  updateFocusButtons();
  syncFocusGlow();
}
function resetFocusTimer(){
  pauseFocusTimer();
  focusTimer.remainingSec = focusTotalSec();
  updateFocusDisplay();
}
function completeFocusSession(){
  pauseFocusTimer();
  playBeep();

showNotification(
    "✅ Focus Session Complete",
    `Great job! Enjoy your ${state.settings.focusBreakMin}-minute break.`
);
  pauseFocusMusic();

  if(focusTimer.mode === 'focus'){
    const log = getTodayLog();
    log.hours = Math.round((log.hours + state.settings.focusWorkMin/60) * 100) / 100;
    log.focusSessions = (log.focusSessions||0) + 1;
    save();
    focusTimer.mode = 'break';
    const breakMessages = [

    (m) => `☕ Great work! Relax for ${m} minute${m>1?"s":""}.`,
    (m) => `😌 You earned a ${m}-minute break.`,
    (m) => `🧠 Your brain deserves ${m} minutes of recovery.`,
    (m) => `💧 Drink some water and come back in ${m} minutes.`,
    (m) => `🚶 Stretch your body. Break ends in ${m} minutes.`,
    (m) => `🌿 Recharge yourself. See you in ${m} minutes!`

];

   const breakMin = state.settings.focusBreakMin;

showNotification(
    "☕ Break Time",
    `Great work! Relax for ${breakMin} minute${breakMin > 1 ? "s" : ""}.`
);

  } else {
    focusTimer.mode = 'focus';
    showNotification(
    "🎯 Ready Again, felt relaxed",
    "Let's begin another focus session."
);
  }
  focusTimer.remainingSec = focusTotalSec();
  renderFocus();
  if(document.getElementById('view-dashboard').style.display !== 'none') renderDashboard();
}
function updateFocusDurations(){
  const w = Number(document.getElementById('focusWorkInput').value) || 25;
  const b = Number(document.getElementById('focusBreakInput').value) || 5;
  state.settings.focusWorkMin = w; state.settings.focusBreakMin = b;
  save();
  if(!focusTimer.running) focusTimer.remainingSec = focusTotalSec();
  renderFocus();
}
function updateFocusDisplay(){
  const total = focusTotalSec();
  const pct = Math.max(0, Math.min(100, Math.round((1 - focusTimer.remainingSec/total)*100)));
  const m = Math.floor(focusTimer.remainingSec/60), s = focusTimer.remainingSec%60;
  const disp = document.getElementById('focusTimeDisplay');
  if(disp) disp.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const fg = document.getElementById('focusRingFg');
  if(fg){ const r = 100, c = 2*Math.PI*r; fg.setAttribute('stroke-dashoffset', c - (pct/100)*c); }
}
function updateFocusButtons(){
  const btn = document.getElementById('focusStartBtn');
  if(btn) btn.textContent = focusTimer.running ? 'Pause' : (focusTimer.remainingSec===focusTotalSec() ? 'Start' : 'Resume');
}
function renderFocus(){
  ensureFocusTimer();
  const el = document.getElementById('view-focus');
  const total = focusTotalSec();
  const pct = Math.max(0, Math.min(100, Math.round((1 - focusTimer.remainingSec/total)*100)));
  const r = 100, c = 2*Math.PI*r;
  const m = Math.floor(focusTimer.remainingSec/60), s = focusTimer.remainingSec%60;
  const onBreak = focusTimer.mode === 'break';
  const log = getTodayLog();
  el.innerHTML = `
  <div class="focus-wrap">
    <div class="focus-mode-label ${onBreak?'on-break':''}">${onBreak ? 'Break' : 'Focus session'}</div>
    <div class="focus-ring-wrap ${onBreak?'on-break':''}">
      <svg viewBox="0 0 220 220"><circle class="focus-ring-bg" cx="110" cy="110" r="${r}" stroke-width="10" fill="none"/>
      <circle id="focusRingFg" class="focus-ring-fg" cx="110" cy="110" r="${r}" stroke-width="10" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${c-(pct/100)*c}"/></svg>
      <div class="focus-time" id="focusTimeDisplay">${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</div>
    </div>
    <div class="focus-controls">
      <button class="focus-btn primary" id="focusStartBtn" onclick="toggleFocusTimer()">${focusTimer.running?'Pause':(focusTimer.remainingSec===total?'Start':'Resume')}</button>
      <button class="focus-btn" onclick="resetFocusTimer()">Reset</button>
    </div>
    <div class="focus-settings">
      <div class="field"><label>Focus (min)</label><input type="number" id="focusWorkInput" value="${state.settings.focusWorkMin}" onchange="updateFocusDurations()"></div>
      <div class="field"><label>Break (min)</label><input type="number" id="focusBreakInput" value="${state.settings.focusBreakMin}" onchange="updateFocusDurations()"></div>
    </div>
    <div class="focus-stats">
      <div class="stat-box"><div class="val">${log.focusSessions||0}</div><div class="lbl">sessions today</div></div>
      <div class="stat-box"><div class="val">${log.hours}h</div><div class="lbl">logged today</div></div>
      <div class="stat-box"><div class="val">${state.streak.count} 🔥</div><div class="lbl">day streak</div></div>
    </div>
    
    <div class="focus-checklist">

      <div class="item">Phone on silent, out of reach</div>
      <div class="item">One chapter or task open — nothing else</div>
      <div class="item">Water bottle filled before you start</div>
      <div class="item">A completed session logs its minutes to today's mission automatically</div>
    </div>
    <div class="focus-music">

<h3>🎵 Focus Soundscape</h3>

<p>Relaxing sounds to improve concentration</p>

<select onchange="changeTrack(this.value)">
<option
value="Devotinoal"
${musicSettings.track==="cafe"?"selected":""}>
☕ Devotinoal
</option>

<option
value="white"
${musicSettings.track==="white"?"selected":""}>
🤍 White Noise
</option>

<option
value="romantic"
${musicSettings.track==="romantic"?"selected":""}>
🤍 Kiss Noise
</option>

</select>

<div class="music-controls">

<button onclick="toggleMusic()">

🎵 Play / Pause

</button>

<button
onclick="toggleMute()">

🔇

</button>

</div>

<input
type="range"
min="0"
max="1"
step="0.01"
value="${musicSettings.volume}"
oninput="changeVolume(this.value)">

</div>
  </div>`;
}

// ---------- PERSONALIZE ----------
function setWakeTime(val){ getTodayLog().wakeTime = val; save(); }
function toggleExercise(val){ getTodayLog().exercise = val; save(); renderPersonalize(); }
function setDayRating(val){ getTodayLog().dayRating = val; save(); renderPersonalize(); }
function setCoachingMode(mode){ getTodayLog().coachingMode = mode; save(); renderPersonalize(); }
function addRoutineItem(mode){
  const timeEl = document.getElementById('routineTime_'+mode);
  const actEl = document.getElementById('routineAct_'+mode);
  const time = timeEl.value, act = actEl.value.trim();
  if(!time || !act) return;
  state.routines[mode].push({id:uid(), time, activity:act});
  state.routines[mode].sort((a,b)=> a.time.localeCompare(b.time));
  actEl.value = '';
  save(); renderPersonalize();
}
function deleteRoutineItem(mode, id){
  state.routines[mode] = state.routines[mode].filter(x=>x.id!==id);
  save(); renderPersonalize();
}
function habitHistoryHTML(){
  let rows = '';
  for(let i=6;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const log = state.dailyLogs[key];
    const label = i===0 ? 'Today' : d.toLocaleDateString('en-IN',{weekday:'short', day:'numeric', month:'short'});
    const wake = log && log.wakeTime ? log.wakeTime : '—';
    const ex = log ? (log.exercise===true?'✅ yes':log.exercise===false?'❌ no':'—') : '—';
    const rating = log && log.dayRating ? '★'.repeat(log.dayRating)+'☆'.repeat(5-log.dayRating) : '—';
    rows += `<div class="hh-row"><div class="d">${label}</div><div style="width:70px">${wake}</div><div style="width:80px">${ex}</div><div>${rating}</div></div>`;
  }
  return rows;
}
function renderPersonalize(){
  const el = document.getElementById('view-personalize');
  const log = getTodayLog();
  const mode = log.coachingMode || 'on';
  let html = `<div class="greet-card">
    <div class="greet-name">Hi ${(state.profile && state.profile.name ? state.profile.name.split(' ')[0] : 'there')} 👋</div>
    <div class="greet-quote">"${quoteOfDay()}"</div>
  </div>`;

  const sh = shlokaOfDay();
  html += `<div class="shloka-card">
    <div class="shloka-ref">Shloka of the day · Bhagavad Gita ${sh.ref}</div>
    <div class="shloka-sanskrit">${sh.sanskrit}</div>
    <div class="shloka-translit">${sh.translit}</div>
    <div class="shloka-meaning">${sh.meaning}</div>
  </div>`;

  html += `<div class="section-title" style="margin-top:0">Today's habit check-in</div><div class="card">
    <div class="habit-row">
      <div class="habit-field"><label>Woke up at</label><input type="time" value="${log.wakeTime||''}" onchange="setWakeTime(this.value)"></div>
      <div class="habit-field"><label>Exercise today</label>
        <div class="exercise-toggle">
          <button class="${log.exercise===true?'active-yes':''}" onclick="toggleExercise(true)">Yes</button>
          <button class="${log.exercise===false?'active-no':''}" onclick="toggleExercise(false)">No</button>
        </div>
      </div>
      <div class="habit-field"><label>How was your day</label>
        <div class="rating-row">
          ${[1,2,3,4,5].map(n=>`<button class="rating-btn ${log.dayRating===n?'active':''}" onclick="setDayRating(${n})">${n}</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="pagesub" style="margin-bottom:6px">Last 7 days</div>
    <div class="habit-history">${habitHistoryHTML()}</div>
  </div>`;

  html += `<div class="section-title">Wake-up time <span class="count">last 14 days</span></div><div class="card">
    <div class="chart-wrap">${wakeTimeChartHTML()}</div>
    <div class="chart-avg-line">Green = by 7am, amber = 7-8am, red = after 8am</div>
  </div>`;

  const pmoStreak = habitStreak('noPMO');
  html += `<div class="section-title">Self-discipline streak</div><div class="card habit-section">
    <div class="streak-display"><div class="streak-num">${pmoStreak} 🔥</div><div class="pagesub">consecutive days maintained</div></div>
    <div class="habit-yn">
      <button class="${log.noPMO===true?'active-yes':''}" onclick="setHabit('noPMO',true)">Maintained today</button>
      <button class="${log.noPMO===false?'active-no':''}" onclick="setHabit('noPMO',false)">Slipped today</button>
    </div>
    <div style="margin-top:14px"><div class="pagesub" style="margin-bottom:6px">Last 30 days</div><div class="heatmap">${habitHeatmapHTML('noPMO')}</div></div>
  </div>`;

  const gossipStreak = habitStreak('noGossip');
  html += `<div class="section-title">Calls under 30 minutes streak</div><div class="card habit-section">
    <div class="streak-display"><div class="streak-num">${gossipStreak} 🔥</div><div class="pagesub">consecutive days kept friend calls short</div></div>
    <div class="habit-yn">
      <button class="${log.noGossip===true?'active-yes':''}" onclick="setHabit('noGossip',true)">Kept it short today</button>
      <button class="${log.noGossip===false?'active-no':''}" onclick="setHabit('noGossip',false)">Went long today</button>
    </div>
    <div style="margin-top:14px"><div class="pagesub" style="margin-bottom:6px">Last 30 days</div><div class="heatmap">${habitHeatmapHTML('noGossip')}</div></div>
  </div>`;

  html += rewardsSectionHTML(log);

  html += `<div class="section-title">Today's routine</div>`;
  html += `<div class="mode-toggle">
    <button class="mode-btn ${mode==='on'?'active':''}" onclick="setCoachingMode('on')">Coaching ON today</button>
    <button class="mode-btn ${mode==='off'?'active':''}" onclick="setCoachingMode('off')">Coaching OFF today</button>
  </div>`;
  html += `<div class="card">`;
  state.routines[mode].forEach(item=>{
    html += `<div class="routine-item"><div class="time">${item.time}</div><div class="act">${item.activity}</div><button class="del" onclick="deleteRoutineItem('${mode}','${item.id}')">&times;</button></div>`;
  });
  html += `<div class="routine-add-row">
    <input type="time" id="routineTime_${mode}">
    <input type="text" id="routineAct_${mode}" placeholder="Add a block to this routine">
    <button onclick="addRoutineItem('${mode}')">Add</button>
  </div></div>`;

  el.innerHTML = html;
}

// ---------- PRACTICE ----------
let practicePhase = "My Tests";
let pbFilterSubject = "All";
let pbFilterDifficulty = "All";

function testCardHTML(t){
  const d = new Date(t.date + 'T00:00:00');
  const daysTo = daysBetween(todayStr(), t.date);
  const isNext = daysTo >= 0;
  const dnum = d.getDate();
  const dmon = d.toLocaleDateString('en-IN',{month:'short'});
  const countdown = daysTo > 0 ? `in ${daysTo}d` : daysTo === 0 ? 'today' : `${Math.abs(daysTo)}d ago`;
  return `<div class="test-card ${isNext && daysTo<=14 ? 'is-next' : ''}">
    <div class="test-date-badge"><div class="dnum">${dnum}</div><div class="dmon">${dmon}</div></div>
    <div class="test-body">
      <div class="test-head">
        <span class="test-name">${t.name}</span>
        <span class="test-pattern ${t.pattern==='JEE Adv'?'adv':''}">${t.pattern}</span>
        <span class="test-countdown">${countdown}</span>
        <button class="chapter-trash" onclick="deleteTestItem('${t.id}')">&times;</button>
      </div>
      <div class="test-syllabus-row phy"><span class="subj-tag">Physics</span><span>${t.physics}</span></div>
      <div class="test-syllabus-row chem"><span class="subj-tag">Chemistry</span><span>${t.chemistry}</span></div>
      <div class="test-syllabus-row math"><span class="subj-tag">Maths</span><span>${t.maths}</span></div>
    </div>
  </div>`;
}
function addTestItem(){
  const date = document.getElementById('tDate').value;
  const name = document.getElementById('tName').value.trim();
  const pattern = document.getElementById('tPattern').value;
  const phase = document.getElementById('tPhase').value.trim() || practicePhase;
  const physics = document.getElementById('tPhysics').value.trim();
  const chemistry = document.getElementById('tChemistry').value.trim();
  const maths = document.getElementById('tMaths').value.trim();
  if(!date || !name) return;
  state.tests.push({id:uid(), date, name, pattern, phase, physics, chemistry, maths});
  document.getElementById('tDate').value = '';
  document.getElementById('tName').value = '';
  document.getElementById('tPhysics').value = '';
  document.getElementById('tChemistry').value = '';
  document.getElementById('tMaths').value = '';
  save(); renderPractice();
}
function deleteTestItem(id){
  if(!confirm("Remove this test from the schedule?")) return;
  state.tests = state.tests.filter(x=>x.id!==id);
  save(); renderPractice();
}
function setPracticePhase(phase){ practicePhase = phase; renderPractice(); }
function setPbFilter(kind, val){
  if(kind==='subject') pbFilterSubject = val; else pbFilterDifficulty = val;
  renderPractice();
}
function addQuestion(){
  const subject = document.getElementById('qSubject').value;
  const chapter = document.getElementById('qChapter').value.trim();
  const difficulty = document.getElementById('qDifficulty').value;
  const source = document.getElementById('qSource').value.trim();
  const text = document.getElementById('qText').value.trim();
  if(!text) return;
  state.practice.questions.unshift({ id:uid(), subject, chapter, difficulty, source, text, solved:false, date:todayStr() });
  document.getElementById('qChapter').value=''; document.getElementById('qSource').value=''; document.getElementById('qText').value='';
  save(); renderPractice();
}
function toggleQuestionSolved(id){
  const q = state.practice.questions.find(x=>x.id===id);
  if(q) q.solved = !q.solved;
  save(); renderPractice();
}
function deleteQuestion(id){
  state.practice.questions = state.practice.questions.filter(x=>x.id!==id);
  save(); renderPractice();
}
function renderPractice(){
  const el = document.getElementById('view-practice');
  const phases = [...new Set(state.tests.map(t=>t.phase))];
  const testsInPhase = state.tests.filter(t=>t.phase===practicePhase).sort((a,b)=>a.date.localeCompare(b.date));

  let html = `<div class="practice-note">Difficulty is tagged by you when you add a question — reliably auto-grading difficulty from a scanned book page would need real AI image/text analysis, which this offline app can't do on its own. Bring me a specific set of questions in chat and I can help sort those into here.</div>`;

  html += `<div class="section-title" style="margin-top:0">Test schedule <span class="count">${state.tests.length} tests loaded</span></div>`;
  html += `<div class="phase-tabs">${phases.map(p=>`<div class="subject-tab ${p===practicePhase?'active':''}" onclick="setPracticePhase('${p}')">${p}</div>`).join('')}</div>`;
  html += testsInPhase.map(testCardHTML).join('') || `<div class="empty">No tests yet — add your first one below, with whatever date works for you.</div>`;

  html += `<div class="pb-add-form" style="margin-top:14px">
    <input id="tDate" type="date">
    <input id="tName" placeholder="Test name (e.g. Minor-15)">
    <select id="tPattern"><option>JEE Main</option><option>JEE Adv</option></select>
    <input id="tPhase" placeholder="Phase (e.g. ${practicePhase})" value="${practicePhase}">
    <input id="tPhysics" placeholder="Physics syllabus">
    <input id="tChemistry" placeholder="Chemistry syllabus">
    <input id="tMaths" placeholder="Maths syllabus">
    <button onclick="addTestItem()">Add test to schedule</button>
  </div>`;

  html += `<div class="section-title">Question bank <span class="count">${state.practice.questions.length} questions</span></div>`;
  html += `<div class="pb-add-form">
    <select id="qSubject"><option>Physics</option><option>Chemistry</option><option>Mathematics</option></select>
    <input id="qChapter" placeholder="Chapter / topic">
    <select id="qDifficulty"><option value="Easy">Easy</option><option value="Medium" selected>Medium</option><option value="Hard">Hard</option></select>
    <input id="qSource" placeholder="Source (book / PYQ / test name)">
    <textarea id="qText" placeholder="Paste or type the question"></textarea>
    <button onclick="addQuestion()">Add question</button>
  </div>`;

  html += `<div class="pb-filters">
    <select onchange="setPbFilter('subject',this.value)">
      <option value="All">All subjects</option>
      <option ${pbFilterSubject==='Physics'?'selected':''}>Physics</option>
      <option ${pbFilterSubject==='Chemistry'?'selected':''}>Chemistry</option>
      <option ${pbFilterSubject==='Mathematics'?'selected':''}>Mathematics</option>
    </select>
    <select onchange="setPbFilter('difficulty',this.value)">
      <option value="All">All difficulties</option>
      <option ${pbFilterDifficulty==='Easy'?'selected':''}>Easy</option>
      <option ${pbFilterDifficulty==='Medium'?'selected':''}>Medium</option>
      <option ${pbFilterDifficulty==='Hard'?'selected':''}>Hard</option>
    </select>
  </div>`;

  const filtered = state.practice.questions.filter(q =>
    (pbFilterSubject==='All' || q.subject===pbFilterSubject) &&
    (pbFilterDifficulty==='All' || q.difficulty===pbFilterDifficulty)
  );
  html += filtered.length ? filtered.map(q=>`
    <div class="q-card ${q.solved?'solved':''}">
      <div class="q-top">
        <span class="diff-pill diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
        <span class="q-meta">${q.subject}${q.chapter?' · '+q.chapter:''}${q.source?' · '+q.source:''}</span>
      </div>
      <div class="q-text">${q.text}</div>
      <div class="q-actions">
        <button class="solved-btn ${q.solved?'on':''}" onclick="toggleQuestionSolved('${q.id}')">${q.solved?'Solved ✓':'Mark solved'}</button>
        <button onclick="deleteQuestion('${q.id}')">Delete</button>
      </div>
    </div>`).join('') : `<div class="empty">No questions match this filter yet.</div>`;

  el.innerHTML = html;
}

// ---------- SETTINGS ----------
function updateTarget(field, val){
  state.settings[field] = Number(val)||0;
  save(); renderDashboard();
}
function updateRewardSetting(field, val){
  if(field==='rewardWakeStart' || field==='rewardWakeEnd'){
    state.settings[field] = val;
  } else {
    state.settings[field] = Number(val)||0;
  }
  save(); renderSettings(); renderPersonalize();
}
function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jee-ascend-backup-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importData(file){
  if(!file) return;
  if(!confirm("This will replace everything currently in the app with the contents of this backup file. Continue?")) {
    document.getElementById('importFileInput').value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e)=>{
    try{
      const parsed = JSON.parse(e.target.result);
      if(!parsed.chapters){ alert("This doesn't look like a JEE Ascend backup file."); return; }
      state = parsed;
      seedIfEmpty();
      if(!state.routines) state.routines = { on: defaultRoutine('on'), off: defaultRoutine('off') };
      if(!state.rewards) state.rewards = { points:0, catalog: defaultRewardCatalog(), redemptions: [] };
      if(!state.tests) state.tests = defaultTests();
      if(!state.practice) state.practice = { questions: [] };
      if(!state.settings) state.settings = {};
      if(state.settings.rewardPointsPerHour===undefined) state.settings.rewardPointsPerHour = 4;
      await save();
      renderAll();
      alert("Backup restored.");
    }catch(err){
      alert("Couldn't read that file — make sure it's an unmodified JEE Ascend backup.");
    }
    document.getElementById('importFileInput').value = '';
  };
  reader.readAsText(file);
}
async function resetAllData(){
  if(!confirm("This deletes every chapter, mistake, task, and streak permanently. Are you sure?")) return;
  state = { chapters: {}, mistakes: [], examDate: state.examDate, streak: {count:0, last:null}, dailyLogs: {}, settings: {hoursTarget:2, questionsTarget:20, focusWorkMin:25, focusBreakMin:5, rewardPointsPerHour:4, rewardWakeStart:"06:00", rewardWakeEnd:"07:00", rewardWakePoints:5, rewardNoPMOPoints:5}, routines: null, rewards: null, profile: state.profile, tests: null, practice: null };
  seedIfEmpty();
  if(!state.routines) state.routines = { on: defaultRoutine('on'), off: defaultRoutine('off') };
  if(!state.rewards) state.rewards = { points:0, catalog: defaultRewardCatalog(), redemptions: [] };
  if(!state.tests) state.tests = defaultTests();
  if(!state.practice) state.practice = { questions: [] };
  await save();
  renderAll();
}
function updateProfile(field, val){
  if(!state.profile) state.profile = {};
  state.profile[field] = val;
  save(); renderPersonalize();
}
function renderSettings(){
  const el = document.getElementById('view-settings');
  let chapterCounts = ''; for(const s in SYLLABUS) chapterCounts += `<option value="${s}">${s} (${state.chapters[s].length} chapters)</option>`;
  const p = state.profile || {name:'', class:'Class 12', examTarget:'JEE Main + Advanced'};
  let html = `
  <div class="settings-block">
    <div class="section-title" style="margin-top:0">Profile</div>
    <div class="card">
      <div class="settings-row"><label>Name</label><input type="text" value="${p.name||''}" onchange="updateProfile('name',this.value)"></div>
      <div class="settings-row"><label>Email</label><input type="email" value="${p.email||''}" onchange="updateProfile('email',this.value)"></div>
      <div class="settings-row"><label>Class</label>
        <select onchange="updateProfile('class',this.value)">
          <option value="Class 11" ${p.class==='Class 11'?'selected':''}>Class 11</option>
          <option value="Class 12" ${p.class==='Class 12'?'selected':''}>Class 12</option>
          <option value="Dropper / Repeater" ${p.class==='Dropper / Repeater'?'selected':''}>Dropper / Repeater</option>
        </select>
      </div>
      <div class="settings-row"><label>Preparing for</label>
        <select onchange="updateProfile('examTarget',this.value)">
          <option value="JEE Main" ${p.examTarget==='JEE Main'?'selected':''}>JEE Main</option>
          <option value="JEE Main + Advanced" ${p.examTarget==='JEE Main + Advanced'?'selected':''}>JEE Main + Advanced</option>
        </select>
      </div>
      <button class="danger-btn" style="background:var(--accent-dim);color:var(--accent);border-color:#2C3970;margin-top:6px" onclick="resendRegistration()">Resend my info to Google Sheet</button>
      <div class="pagesub" style="margin-top:8px">Use this to test the Google Sheet connection, or to re-send if you edited your details above.</div>
    </div>
  </div>

  <div class="settings-block">
    <div class="section-title">Daily targets</div>
    <div class="card">
      <div class="settings-row"><label>Study hours per day</label><input type="number" step="0.5" value="${state.settings.hoursTarget}" onchange="updateTarget('hoursTarget',this.value)"></div>
      <div class="settings-row"><label>Questions per day</label><input type="number" value="${state.settings.questionsTarget}" onchange="updateTarget('questionsTarget',this.value)"></div>
      <div class="pagesub">These drive the progress bar and "close out today" mission on the dashboard. Set either to 0 to ignore it.</div>
    </div>
  </div>

  <div class="settings-block">
    <div class="section-title">Reward points</div>
    <div class="card">
      <div class="settings-row"><label>Points per hour studied</label><input type="number" step="0.5" value="${state.settings.rewardPointsPerHour}" onchange="updateRewardSetting('rewardPointsPerHour',this.value)"><span class="pagesub" style="margin-left:8px">e.g. 8h studied = ${Math.round(8*state.settings.rewardPointsPerHour)} pts, 3h = ${Math.round(3*state.settings.rewardPointsPerHour)} pts</span></div>
      <div class="settings-row"><label>Wake-up window for points</label><input type="time" value="${state.settings.rewardWakeStart}" onchange="updateRewardSetting('rewardWakeStart',this.value)"> to <input type="time" value="${state.settings.rewardWakeEnd}" onchange="updateRewardSetting('rewardWakeEnd',this.value)"><span class="pagesub" style="margin-left:8px">→ </span><input type="number" value="${state.settings.rewardWakePoints}" onchange="updateRewardSetting('rewardWakePoints',this.value)" style="width:60px"> pts</div>
      <div class="settings-row"><label>Self-discipline day maintained</label><span class="pagesub">→ </span><input type="number" value="${state.settings.rewardNoPMOPoints}" onchange="updateRewardSetting('rewardNoPMOPoints',this.value)" style="width:60px"> pts</div>
      <div class="pagesub">Points are credited once a day, when you hit "Close out today" on the dashboard. Add or edit what you can redeem them for in the Personalize tab.</div>
    </div>
  </div>

  <div class="settings-block">
    <div class="section-title">Manage chapters</div>
    <div class="card">
      <div class="pagesub" style="margin-bottom:10px">Add or remove chapters per subject from the Subjects tab — every subject has its own "add chapter" box at the top.</div>
      <div class="settings-row"><label>Chapters currently tracked</label><select>${chapterCounts}</select></div>
    </div>
  </div>

  <div class="settings-block">
    <div class="section-title">Data</div>
    <div class="card">
      <div class="pagesub" style="margin-bottom:12px">Data is saved to this browser only — clearing your browser's site data, or opening the app on a different browser or device, won't carry it over. Export a backup file regularly and save it somewhere safe (Google Drive, email to yourself, a synced folder) so a cleared cache never costs you anything.</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
        <button class="add-chapter-row button" style="background:var(--accent);color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:13px;cursor:pointer" onclick="exportData()">Export backup (.json)</button>
        <button style="background:var(--panel-2);border:1px solid var(--line);color:var(--text);padding:9px 18px;border-radius:8px;font-size:13px;cursor:pointer" onclick="document.getElementById('importFileInput').click()">Import backup</button>
        <input type="file" id="importFileInput" accept=".json" style="display:none" onchange="importData(this.files[0])">
      </div>
      <button class="danger-btn" onclick="resetAllData()">Reset all data</button>
    </div>
    
    <div class="settings-block">

    <div class="section-title">
        💬 Feedback
    </div>

    <div class="feedback-card">

        <div class="feedback-icon">
            💬
        </div>

        <div class="feedback-content">

            <div class="feedback-title">
                Help Improve JEE Ascend
            </div>

            <div class="feedback-text">
                Found a bug, have an idea, or want a new feature?
                I'd love to hear your thoughts.
            </div>

            <div class="feedback-mail">
                anshu9935@outlook.com
            </div>

        </div>

        <button
            class="feedback-btn"
            onclick="sendFeedback()">

            Send Feedback

        </button>

    </div>

</div>
  </div>`;

  html += `
<div class="settings-block">

    <div class="section-title">
        Account
    </div>

    <div class="logout-card">

        <div class="logout-left">

            <div class="logout-icon">
                🚪
            </div>

            <div>

                <div class="logout-title">
                    Sign out
                </div>

                <div class="logout-desc">
                    Log out from this device. Your study progress remains safely saved.
                </div>

            </div>

        </div>

        <button
            class="logout-btn"
            onclick="logoutUser()">
            Logout
        </button>

    </div>

</div>
`;
  el.innerHTML = html;
}

// ---------- NAV + INIT ----------
const TITLES = {
  dashboard:['Dashboard',"What to do next, ranked by what's due."],
  subjects:['Subjects',"Every chapter, its checklist, and its revision cycle."],
  planner:['Planner',"Today's plan, generated from due revisions and open chapters."],
  focus:['Focus',"A distraction-free timer that logs straight into today's mission."],
  mistakes:['Mistake book',"Every error, tagged by type, until it's fixed."],
  analytics:['Analytics',"Completion, strength distribution, and mistake patterns."],
  settings:['Settings',"Daily targets, chapter management, and data."],
  personalize:['Personalize',"Your habit check-in, a daily quote, and your coaching-on / coaching-off routine."],
  practice:['Practice',"Your imported test schedule and a manually-tagged question bank by subject and difficulty."]
};
function toggleSidebar(){
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}
function closeSidebar(){
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}
function showView(v){
  document.querySelectorAll('.navitem').forEach(n=>n.classList.toggle('active', n.dataset.view===v));
  document.querySelectorAll('[id^="view-"]').forEach(d=>d.style.display='none');
  document.getElementById('view-'+v).style.display='block';
  document.getElementById('pageTitle').textContent = TITLES[v][0];
  document.getElementById('pageSub').textContent = TITLES[v][1];
  closeSidebar();
}
function renderAll(){
  renderDashboard(); renderSubjects(); renderPlanner(); renderMistakes(); renderAnalytics(); renderSettings(); renderFocus(); renderPersonalize(); renderPractice();
  const d = daysBetween(todayStr(), state.examDate);
  document.getElementById('daysLeft').textContent = d>=0? d : 0;
}
document.querySelectorAll('.navitem').forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));
document.getElementById('examDate').addEventListener('change', e=>{ state.examDate = e.target.value; save(); renderAll(); });

function resendRegistration(){
  if(!state.profile || !state.profile.name){ alert('No profile saved yet.'); return; }
  submitToGoogleSheet(state.profile);
  alert('Sent. Check your Google Sheet in a few seconds — if it still doesn\'t show up, the form link or entry IDs likely need rechecking.');
}
function submitToGoogleSheet(profile){
  if(!GOOGLE_FORM_ACTION_URL) return;
  try{
    let iframe = document.getElementById('gformTarget');
    if(!iframe){
      iframe = document.createElement('iframe');
      iframe.name = 'gformTarget';
      iframe.id = 'gformTarget';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    const form = document.createElement('form');
    form.action = GOOGLE_FORM_ACTION_URL;
    form.method = 'POST';
    form.target = 'gformTarget';
    form.style.display = 'none';
    const fields = { [GOOGLE_FORM_ENTRY_IDS.name]: profile.name, [GOOGLE_FORM_ENTRY_IDS.email]: profile.email||'', [GOOGLE_FORM_ENTRY_IDS.class]: profile.class, [GOOGLE_FORM_ENTRY_IDS.exam]: profile.examTarget };
    for(const key in fields){
      if(!key) continue;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    setTimeout(()=>{ document.body.removeChild(form); }, 2000);
  }catch(e){}
}
function toggleRestoreBox(e){
  e.preventDefault();
  const box = document.getElementById('restoreBox');
  box.style.display = box.style.display==='none' ? 'block' : 'none';
}
async function restoreFromCloud(){
  const email = document.getElementById('restoreEmail').value.trim();
  if(!email){ alert('Enter the email you registered with.'); return; }
  if(!db){ alert("Cloud sync isn't set up in this copy of the app yet."); return; }
  const restored = await pullStateFromCloud(email);
  if(!restored){ alert("No saved data found for that email. Double-check it, or continue registering fresh above."); return; }
  state = restored;
  await save();
  document.getElementById('onboardingScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  renderAll();
}
function logoutUser(){

    if(!confirm("Are you sure you want to logout?")){
        return;
    }

    state.profile = null;

    save();

    document.getElementById("mainApp").style.display = "none";
    document.getElementById("onboardingScreen").style.display = "flex";
}

function completeOnboarding(){
  const name = document.getElementById('obName').value.trim();
  if(!name){ alert('Please enter your name to continue.'); return; }
  const email = document.getElementById('obEmail').value.trim();
  if(!email || email.indexOf('@')===-1 || email.indexOf('.')===-1){ alert('Please enter a valid email address to continue.'); return; }
  const cls = document.getElementById('obClass').value;
  const exam = document.getElementById('obExam').value;
  state.profile = { name, email, class: cls, examTarget: exam };
  save();
  submitToGoogleSheet(state.profile);
  document.getElementById('onboardingScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  renderAll();
  localStorage.setItem(
    "onboardingCompleted",
    "true"
);
}

if('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ======================
// NOTIFICATIONS
// ======================

async function requestNotificationPermission(){

    if(!("Notification" in window)){
        console.log("Notifications not supported");
        return;
    }

    if(Notification.permission === "default"){
        await Notification.requestPermission();
    }

}

function showNotification(title, body){

  function dailyMissionNotification(){

    const today = getTodayLog();

    showNotification(
        "🎯 Today's Mission",
        `Study Hours : ${today.hours}h
Sessions : ${today.focusSessions || 0}
Keep your streak alive 🔥`
    );

}

    if(Notification.permission !== "granted") return;

    new Notification(title,{
        body: body,
        icon:"icons/icon-192.png",
        badge:"icons/icon-192.png",
        silent:true
    });

}

(async function init(){
  await load();
  await requestNotificationPermission();
  renderAll();
  
scheduleNextNotification();
  
  setTimeout(()=>{
    document.getElementById('splashScreen').style.display = 'none';
    if(state.profile && state.profile.name){
      document.getElementById('mainApp').style.display = 'block';
    } else {
      document.getElementById('onboardingScreen').style.display = 'flex';
    }
  }, 1900);
  let lastKnownDay = todayStr();
  function checkDayRollover(){
    const t = todayStr();
    if(t !== lastKnownDay){
      lastKnownDay = t;
      renderAll();

      // ================================
// Planner Reminder
// ================================
setInterval(() => {

    const pending = state.tasks
        ? state.tasks.filter(t => !t.done).length
        : 0;

    if (pending > 0) {
        showNotification(
            "📚 Planner Reminder",
            `You still have ${pending} task(s) left today.`
        );
    }

}, 3600000);
    }
  }
  setInterval(checkDayRollover, 60000);
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) checkDayRollover(); });
  window.addEventListener('focus', checkDayRollover);
})();

function sendFeedback() {
    const profile = state.profile || {};

    const name = profile.name || "";
    const email = profile.email || "";
    const studentClass = profile.class || "";
    const exam = profile.exam || "";

    const subject = encodeURIComponent("JEE Ascend Feedback");

    const body = encodeURIComponent(
`Hello Anshu,

Name: ${name}
Email: ${email}
Class: ${studentClass}
Preparing For: ${exam}

------------------------------------

Feedback:




------------------------------------

Device:
Browser:

`
    );

    window.location.href =
        `mailto:anshu9935@outlook.com?subject=${subject}&body=${body}`;
}

window.addEventListener("load",()=>{

    const running = localStorage.getItem("focusRunning");

    const endTime = Number(
        localStorage.getItem("focusEndTime")
    );

    if(running==="true" && endTime){

        focusTimer.remainingSec = Math.max(
            0,
            Math.ceil((endTime-Date.now())/1000)
        );

        focusTimer.endTime = endTime;

        if(focusTimer.remainingSec>0){

            startFocusTimer();

            updateFocusDisplay();

        }

    }

});

document.addEventListener("visibilitychange",()=>{

    if(document.hidden) return;

    if(focusTimer.running){

        focusTimer.remainingSec = Math.max(
            0,
            Math.ceil(
                (focusTimer.endTime-Date.now())/1000
            )
        );

        updateFocusDisplay();

    }

});


const notificationMessages = {

    morning: [
        "🌞 Good Morning! Kya plan hai aaj ka?",
        "🎯 IIT ka sapna yaad hai? Aaj ka target set karo.",
        "📚 Aaj ka mission shuru karte hain.",
        "🔥 Aaj ka din streak ke naam."
    ],

    afternoon: [
        "💪 Bas ek focus session aur.",
        "📵 Phone baad me, rank pehle.",
        "⚡ Aaj ka momentum mat todna.",
        "🚀 Future wala tum thank you bolega."
    ],

    evening: [
        "📊 Aaj kitna complete hua?",
        "📚 Planner check kiya?",
        "🎯 Bas kuch tasks aur.",
        "🔥 Finish strong."
    ],

    night: [
        "🌙 Streak puri karke hi sona.",
        "🏆 Kal ki tension aaj khatam karo.",
        "💯 Ek session aur.",
        "⭐ Consistency wins."
    ]

};


function randomMessage(type){

    const list = notificationMessages[type];

    return list[
        Math.floor(Math.random()*list.length)
    ];

}

function notificationType(){

    const h = new Date().getHours();

    if(h<11)
        return "morning";

    if(h<17)
        return "afternoon";

    if(h<21)
        return "evening";

    return "night";

}

function scheduleNextNotification(){

    const min = 2*60*60*1000;

    const max = 5*60*60*1000;

    const delay = Math.random()*(max-min)+min;

    setTimeout(()=>{

        sendMotivation();

        scheduleNextNotification();

    },delay);

}
