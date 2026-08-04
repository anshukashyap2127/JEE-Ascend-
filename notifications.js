// ===========================
// Notification Manager (Capacitor Local Notifications)
// ===========================

const NOTIFY_IDS = {
  plannerTask: 1100,
  subjectTarget: 1150,
  focusStart: 1200,
  focusPause: 1201,
  focusComplete: 1202,
  breakComplete: 1203,
  dayComplete: 1300,
  revisionDue: 1400,
  motivation1: 1501,
  motivation2: 1502,
  motivation3: 1503,
  streakReminder: 999001
};

async function requestNotificationPermission(){
  if(!window.Capacitor) return;
  try{
    const { LocalNotifications } = Capacitor.Plugins;
    const permission = await LocalNotifications.requestPermissions();
    if(permission && permission.display === 'granted'){
      await sendNotification(
        '🔔 JEE Ascend ready',
        'Your reminders and streak alerts are now active.',
        900001 + Math.floor(Date.now() / 1000)
      );
    }
  }catch(e){ console.warn('Notification permission request failed:', e); }
}

async function testLocalNotification(){
  await sendNotification(
    '✅ Test notification',
    'Notifications are working on your Android device.',
    900002 + Math.floor(Date.now() / 1000)
  );
}

async function sendNotification(title, body, id, at = Date.now() + 500){
  if(!window.Capacitor) return;
  try{
    const { LocalNotifications } = Capacitor.Plugins;
    await LocalNotifications.schedule({
      notifications: [{
        id: id || Math.floor(Date.now() / 1000),
        title,
        body,
        schedule: { at: new Date(at) }
      }]
    });
  }catch(e){ console.warn('sendNotification failed:', e); }
}

async function notifyPlannerTaskDone(taskText = 'planner target'){
  await sendNotification(
    '✅ Planner target cleared',
    `${taskText} is done. Keep the streak rolling.`,
    NOTIFY_IDS.plannerTask + Math.floor(Date.now() / 1000)
  );
}

async function notifySubjectTargetDone(label = 'target', emoji = '🎯'){
  await sendNotification(
    `${emoji} ${label} complete`,
    'Nice job. Your subject streak just got stronger.',
    NOTIFY_IDS.subjectTarget + Math.floor(Date.now() / 1000)
  );
}

async function notifyFocusStart(){
  await sendNotification('🎯 Focus session started', 'Stay locked in — you have a clean sprint ahead.');
}

async function notifyFocusPause(){
  await sendNotification('⏸️ Focus paused', 'Your session is on hold. You can jump back in anytime.');
}

async function notifyFocusComplete(){
  await sendNotification('🎯 Focus session complete', 'Nice work. Time to either rest or take on the next target.');
}

async function notifyBreakComplete(){
  await sendNotification('☕ Break time is over', 'Back to the work block. One focused step at a time.');
}

async function notifyDayComplete(progress = 100, streak = 0){
  const body = `Mission progress: ${progress}% • Streak: ${streak} day${streak === 1 ? '' : 's'}`;
  await sendNotification('✅ Day closed out', body, NOTIFY_IDS.dayComplete + Math.floor(Date.now() / 1000));
}

async function notifyRevisionDue(chapterName){
  await sendNotification(
    '🕒 Revision due',
    `${chapterName} is due now. One quick review keeps the momentum alive.`,
    NOTIFY_IDS.revisionDue + Math.floor(Date.now() / 1000)
  );
}

async function scheduleMotivationalReminders(){
  if(!window.Capacitor) return;
  try{
    const { LocalNotifications } = Capacitor.Plugins;
    const ids = [NOTIFY_IDS.motivation1, NOTIFY_IDS.motivation2, NOTIFY_IDS.motivation3];
    const titles = [
      '🌤️ Small step, strong result',
      '💡 You do not need to feel ready',
      '🔥 Keep the momentum alive'
    ];
    const bodies = [
      'A short focused block now will make tomorrow easier.',
      'One clean revision is worth more than a scattered hour.',
      'You are building a streak one smart action at a time.'
    ];
    const times = [9, 13, 18];
    const now = new Date();
    const date = new Date(now);
    date.setSeconds(0, 0);
    for(let i=0;i<ids.length;i++){
      await LocalNotifications.cancel({ notifications: [{ id: ids[i] }] });
      let at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), times[i], 0, 0);
      if(at <= now) at.setDate(at.getDate() + 1);
      await LocalNotifications.schedule({
        notifications: [{
          id: ids[i],
          title: titles[i],
          body: bodies[i],
          schedule: { at, repeats: true, every: 'day' }
        }]
      });
    }
  }catch(e){ console.warn('Motivational reminder scheduling failed:', e); }
}

// Schedules one repeating daily reminder at 8 PM, re-armed each time the app opens
// so it never stacks duplicates.
async function scheduleStreakReminder(){
  if(!window.Capacitor) return;
  try{
    const { LocalNotifications } = Capacitor.Plugins;
    await LocalNotifications.cancel({ notifications: [{ id: NOTIFY_IDS.streakReminder }] });
    const now = new Date();
    let at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
    if(at <= now) at.setDate(at.getDate() + 1);
    await LocalNotifications.schedule({
      notifications: [{
        id: NOTIFY_IDS.streakReminder,
        title: '🔥 Protect your streak',
        body: "Close out today's mission before it slips.",
        schedule: { at, repeats: true, every: 'day' }
      }]
    });
  }catch(e){ console.warn('Streak reminder scheduling failed:', e); }
}

async function scheduleRevisionDueNotifications(){
  if(!window.Capacitor) return;
  try{
    const { LocalNotifications } = Capacitor.Plugins;
    const now = new Date();
    const due = allChapters().map(c => ({ c, st: computeRevisionStatus(c) }))
      .filter(x => x.st && (x.st.overdue || x.st.dueToday));
    for(let i = 0; i < due.length; i++){
      const x = due[i];
      const at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
      await LocalNotifications.cancel({ notifications: [{ id: NOTIFY_IDS.revisionDue + i + 1 }] });
      await LocalNotifications.schedule({
        notifications: [{
          id: NOTIFY_IDS.revisionDue + i + 1,
          title: '🕒 Revision due',
          body: `${x.c.name} in ${x.c.subject} is due now.`,
          schedule: { at }
        }]
      });
    }
  }catch(e){ console.warn('Revision reminder scheduling failed:', e); }
}